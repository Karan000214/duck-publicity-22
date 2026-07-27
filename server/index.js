const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { runQuery, getRow, getAllRows } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'DuckPublicitySecretKey2026!';

app.use(cors());
app.use(express.json());

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// ==================== AUTHENTICATION ROUTES ====================

// Admin Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await getRow(`SELECT * FROM users WHERE username = ?`, [username]);
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: '24h',
    });

    res.json({
      message: 'Login successful',
      token,
      user: { username: user.username },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify Active User Token
app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Change Password
app.post('/api/auth/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new password are required' });
    }

    const user = await getRow(`SELECT * FROM users WHERE id = ?`, [req.user.id]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect current password' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await runQuery(`UPDATE users SET password = ? WHERE id = ?`, [hashedNewPassword, req.user.id]);

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ==================== CONTENT MANAGEMENT ROUTES ====================

// Get All Website Content (Public)
app.get('/api/content', async (req, res) => {
  try {
    const rows = await getAllRows(`SELECT * FROM site_content`);
    const content = {};
    rows.forEach((row) => {
      try {
        content[row.key] = JSON.parse(row.data);
      } catch (e) {
        content[row.key] = row.data;
      }
    });
    res.json(content);
  } catch (err) {
    console.error('Fetch content error:', err);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// Update Website Content (Protected)
app.put('/api/content', authenticateToken, async (req, res) => {
  try {
    const contentPayload = req.body; // { hero: {...}, services: [...], testimonials: [...] }
    if (!contentPayload || typeof contentPayload !== 'object') {
      return res.status(400).json({ error: 'Invalid content payload' });
    }

    for (const [key, value] of Object.entries(contentPayload)) {
      const jsonString = JSON.stringify(value);
      await runQuery(
        `INSERT INTO site_content (key, data, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)
         ON CONFLICT(key) DO UPDATE SET data = ?, updated_at = CURRENT_TIMESTAMP`,
        [key, jsonString, jsonString]
      );
    }

    res.json({ message: 'Site content updated successfully' });
  } catch (err) {
    console.error('Update content error:', err);
    res.status(500).json({ error: 'Failed to update content' });
  }
});

const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

// ==================== LEGAL DOCUMENTS (.DOCX) ROUTES ====================

const legalDocMapping = {
  'privacy-policy': ['Duck Publicity Privacy Policy.docx', 'Privacy Policy.docx', 'privacy.docx'],
  'terms-of-service': ['Duck Publicity Terms of Service.docx', 'Terms of Service.docx', 'terms.docx'],
  'cookie-policy': ['Cookie Policy – Duck Publicity.docx', 'Cookie Policy - Duck Publicity.docx', 'Cookie Policy.docx', 'cookie.docx'],
  'disclaimer': ['Disclaimer.docx', 'disclaimer.docx']
};

function findLegalDocFile(docType) {
  const possibleNames = legalDocMapping[docType] || [];
  const projectRoot = path.join(__dirname, '..');
  const legalDocsDir = path.join(projectRoot, 'legal_docs');

  // Search project root & legal_docs directory
  for (const name of possibleNames) {
    const rootPath = path.join(projectRoot, name);
    if (fs.existsSync(rootPath)) return rootPath;

    const dirPath = path.join(legalDocsDir, name);
    if (fs.existsSync(dirPath)) return dirPath;
  }

  // Fallback regex matching
  try {
    const rootFiles = fs.readdirSync(projectRoot);
    const match = rootFiles.find((f) => {
      if (!f.endsWith('.docx')) return false;
      const lower = f.toLowerCase();
      if (docType === 'privacy-policy' && lower.includes('privacy')) return true;
      if (docType === 'terms-of-service' && lower.includes('terms')) return true;
      if (docType === 'cookie-policy' && lower.includes('cookie')) return true;
      if (docType === 'disclaimer' && lower.includes('disclaimer')) return true;
      return false;
    });

    if (match) return path.join(projectRoot, match);
  } catch (e) {
    console.error('Error finding legal doc:', e);
  }

  return null;
}

// Get single legal doc HTML parsed live from .docx file
app.get('/api/legal/:docType', async (req, res) => {
  try {
    const { docType } = req.params;
    const filePath = findLegalDocFile(docType);

    if (!filePath) {
      return res.status(404).json({ error: `Word document file for ${docType} not found.` });
    }

    const stats = fs.statSync(filePath);
    const result = await mammoth.convertToHtml({ path: filePath });

    res.json({
      docType,
      filename: path.basename(filePath),
      lastModified: stats.mtime.toISOString(),
      html: result.value || ''
    });
  } catch (err) {
    console.error('Fetch legal doc error:', err);
    res.status(500).json({ error: 'Failed to read legal document file' });
  }
});

// List status of all 4 legal docx files
app.get('/api/legal-status', (req, res) => {
  const docs = ['privacy-policy', 'terms-of-service', 'cookie-policy', 'disclaimer'];
  const status = docs.map((docType) => {
    const filePath = findLegalDocFile(docType);
    if (filePath) {
      const stats = fs.statSync(filePath);
      return {
        docType,
        found: true,
        filename: path.basename(filePath),
        lastModified: stats.mtime.toISOString(),
        sizeBytes: stats.size
      };
    }
    return { docType, found: false };
  });
  res.json(status);
});

// Submit Form (Public)
app.post(['/api/submissions', '/api/leads'], async (req, res) => {
  try {
    const { name, email, phone, company, service, message } = req.body;
    if (!name || !email || !phone || !phone.trim()) {
      return res.status(400).json({ error: 'Name, email, and phone number are compulsory' });
    }

    const result = await runQuery(
      `INSERT INTO form_submissions (name, email, phone, company, service, message, status) VALUES (?, ?, ?, ?, ?, ?, 'New')`,
      [name.trim(), email.trim(), phone.trim(), company || '', service || 'General Inquiry', message || '']
    );

    res.status(201).json({
      message: 'Form submitted successfully',
      submissionId: result.lastID,
    });
  } catch (err) {
    console.error('Submit form error:', err);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

// Get All Submissions (Protected)
app.get('/api/submissions', authenticateToken, async (req, res) => {
  try {
    const submissions = await getAllRows(`SELECT * FROM form_submissions ORDER BY created_at DESC`);
    res.json(submissions);
  } catch (err) {
    console.error('Fetch submissions error:', err);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Update Submission Status (Protected)
app.patch('/api/submissions/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    await runQuery(`UPDATE form_submissions SET status = ? WHERE id = ?`, [status, id]);
    res.json({ message: 'Submission status updated' });
  } catch (err) {
    console.error('Update submission error:', err);
    res.status(500).json({ error: 'Failed to update submission' });
  }
});

// Delete Submission (Protected)
app.delete('/api/submissions/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await runQuery(`DELETE FROM form_submissions WHERE id = ?`, [id]);
    res.json({ message: 'Submission deleted' });
  } catch (err) {
    console.error('Delete submission error:', err);
    res.status(500).json({ error: 'Failed to delete submission' });
  }
});

// ==================== ANALYTICS & TRACKING ROUTES ====================

// Track Page View & Cookie Visitor Data (Public)
app.post('/api/analytics/track', async (req, res) => {
  try {
    const { path, referrer, visitorId, visitCount, isReturning, utmSource, utmMedium, utmCampaign } = req.body;
    const userAgent = req.headers['user-agent'] || '';

    await runQuery(
      `INSERT INTO analytics_events (path, referrer, user_agent, visitor_id, visit_count, is_returning, utm_source, utm_medium, utm_campaign) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        path || '/',
        referrer || '',
        userAgent,
        visitorId || 'v_unknown',
        visitCount || 1,
        isReturning ? 1 : 0,
        utmSource || 'Direct',
        utmMedium || 'None',
        utmCampaign || 'None',
      ]
    );

    res.json({ tracked: true });
  } catch (err) {
    console.error('Track analytics error:', err);
    res.status(500).json({ error: 'Failed to log analytics' });
  }
});

// Get Analytics Summary Reports (Protected)
app.get('/api/analytics/summary', authenticateToken, async (req, res) => {
  try {
    // 1. Lead Counts
    const totalRow = await getRow(`SELECT COUNT(*) as count FROM form_submissions`);
    const newRow = await getRow(`SELECT COUNT(*) as count FROM form_submissions WHERE status = 'New'`);
    const contactedRow = await getRow(`SELECT COUNT(*) as count FROM form_submissions WHERE status = 'Contacted'`);
    const resolvedRow = await getRow(`SELECT COUNT(*) as count FROM form_submissions WHERE status = 'Resolved'`);

    // 2. Page Views & Cookie Visitor Counts
    const viewsRow = await getRow(`SELECT COUNT(*) as count FROM analytics_events`);
    const uniqueCookieVisitorsRow = await getRow(`SELECT COUNT(DISTINCT visitor_id) as count FROM analytics_events`);
    const returningVisitorsRow = await getRow(`SELECT COUNT(DISTINCT visitor_id) as count FROM analytics_events WHERE visit_count > 1 OR is_returning = 1`);

    // 3. Service Breakdown
    const serviceRows = await getAllRows(
      `SELECT service, COUNT(*) as count FROM form_submissions GROUP BY service ORDER BY count DESC`
    );

    // 4. Past 7 Days Submission Trend
    const trendRows = await getAllRows(`
      SELECT strftime('%Y-%m-%d', created_at) as date, COUNT(*) as count 
      FROM form_submissions 
      GROUP BY date 
      ORDER BY date ASC 
      LIMIT 14
    `);

    // 5. Popular Pages
    const popularPageRows = await getAllRows(`
      SELECT path, COUNT(*) as count 
      FROM analytics_events 
      GROUP BY path 
      ORDER BY count DESC 
      LIMIT 5
    `);

    // 6. Recent Cookie Visitors Log
    const cookieLogs = await getAllRows(`
      SELECT visitor_id, visit_count, is_returning, utm_source, path, timestamp 
      FROM analytics_events 
      ORDER BY timestamp DESC 
      LIMIT 10
    `);

    res.json({
      metrics: {
        totalLeads: totalRow ? totalRow.count : 0,
        newLeads: newRow ? newRow.count : 0,
        contactedLeads: contactedRow ? contactedRow.count : 0,
        resolvedLeads: resolvedRow ? resolvedRow.count : 0,
        pageViews: viewsRow ? viewsRow.count : 0,
        uniqueCookieVisitors: uniqueCookieVisitorsRow ? uniqueCookieVisitorsRow.count : 0,
        returningVisitors: returningVisitorsRow ? returningVisitorsRow.count : 0,
        conversionRate: totalRow && totalRow.count > 0 ? ((resolvedRow.count / totalRow.count) * 100).toFixed(1) + '%' : '0%',
      },
      servicesBreakdown: serviceRows.map((r) => ({ name: r.service || 'General Inquiry', value: r.count })),
      submissionTrend: trendRows,
      popularPages: popularPageRows,
      cookieLogs: cookieLogs,
    });
  } catch (err) {
    console.error('Analytics summary error:', err);
    res.status(500).json({ error: 'Failed to load analytics summary' });
  }
});

// Download Submissions Report as CSV (Protected)
app.get('/api/analytics/export-csv', authenticateToken, async (req, res) => {
  try {
    const submissions = await getAllRows(`SELECT * FROM form_submissions ORDER BY created_at DESC`);

    let csvContent = 'ID,Name,Email,Phone,Company,Service,Status,Date,Message\n';
    submissions.forEach((sub) => {
      const cleanMessage = `"${(sub.message || '').replace(/"/g, '""')}"`;
      const cleanName = `"${(sub.name || '').replace(/"/g, '""')}"`;
      const cleanCompany = `"${(sub.company || '').replace(/"/g, '""')}"`;
      csvContent += `${sub.id},${cleanName},${sub.email},${sub.phone || ''},${cleanCompany},"${sub.service || ''}",${sub.status},${sub.created_at},${cleanMessage}\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=Duck_Publicity_Leads_Report.csv');
    res.send(csvContent);
  } catch (err) {
    console.error('Export CSV error:', err);
    res.status(500).json({ error: 'Failed to export CSV' });
  }
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Duck Publicity backend server running on http://localhost:${PORT}`);
  });
}
