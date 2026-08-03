const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

let db = null;
let useSqlite = false;

try {
  const sqlite3 = require('sqlite3').verbose();
  const isVercel = process.env.VERCEL || process.env.NOW_BUILDER;
  const dbPath = isVercel ? path.join('/tmp', 'database.sqlite') : path.resolve(__dirname, 'database.sqlite');
  db = new sqlite3.Database(dbPath);
  useSqlite = true;
  console.log('Database Engine: SQLite3 (' + dbPath + ')');
} catch (e) {
  console.warn('SQLite3 native module unavailable or failed to load. Switching to Pure JS Database Engine:', e.message);
  useSqlite = false;
}

// Default site content structure
const defaultContent = {
  hero: {
    tagline: 'Your Vision - Our Strategy - Real Growth',
    mainHeadline: 'We Turn Marketing Into Measurable Growth',
    subheadline: "Duck Publicity helps brands scale using performance-driven digital marketing strategies. We don't do vanity metrics – we deliver real ROI.",
    metrics: [
      { id: 1, label: 'ROAS', value: '120%', prefix: '+' },
      { id: 2, label: 'Leads Generated', value: '200+', prefix: '' },
      { id: 3, label: 'Revenue Growth', value: '60%', prefix: '+' },
      { id: 4, label: 'Conversion Rate', value: '12%', prefix: '' },
    ],
  },
  services: [
    {
      id: 1,
      title: 'Performance Marketing',
      description: 'Data-driven campaigns that focus on measurable results and ROI optimization.',
      results: '320% avg ROI',
      iconName: 'Zap',
      color: 'from-orange to-red-500',
    },
    {
      id: 2,
      title: 'Meta Ads',
      description: 'Strategic Facebook & Instagram campaigns designed for conversion and scale.',
      results: '4.8% avg conversion',
      iconName: 'Target',
      color: 'from-blue-600 to-blue-400',
    },
    {
      id: 3,
      title: 'Google Ads',
      description: 'High-intent keyword targeting to capture customers ready to buy.',
      results: '8.5% avg CTR',
      iconName: 'Search',
      color: 'from-yellow-400 to-orange-400',
    },
    {
      id: 4,
      title: 'Social Media Marketing',
      description: 'Content strategy, community management, and organic growth campaigns.',
      results: '250% engagement growth',
      iconName: 'Smartphone',
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 5,
      title: 'SEO Optimization',
      description: 'Technical and content SEO to dominate search results and drive organic traffic.',
      results: '180% organic traffic',
      iconName: 'Search',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 6,
      title: 'Branding & Creative',
      description: 'Premium brand strategy and creative design that converts and resonates.',
      results: '95% brand recall',
      iconName: 'Palette',
      color: 'from-purple-600 to-indigo-600',
    },
    {
      id: 7,
      title: 'Website Development',
      description: 'High-converting, responsive websites built for performance and user experience.',
      results: '6.2% avg conversion',
      iconName: 'Globe',
      color: 'from-teal-500 to-cyan-500',
    },
    {
      id: 8,
      title: 'Lead Generation',
      description: 'Strategic campaigns designed to generate high-quality leads for your business.',
      results: '$8 cost per lead',
      iconName: 'Target',
      color: 'from-orange to-yellow-500',
    },
  ],
  testimonials: [
    {
      id: 1,
      title: 'Clear Communication',
      description: 'Regular updates, transparent reporting, and honest conversations without confusing marketing jargon.',
      iconName: 'MessageCircle',
    },
    {
      id: 2,
      title: 'Long-Term Partnership',
      description: 'We treat your business like our own and focus on sustainable growth instead of short-term wins.',
      iconName: 'ShieldCheck',
    },
    {
      id: 3,
      title: 'Fast Execution',
      description: 'Quick responses, proactive improvements, and a team that keeps moving your projects forward.',
      iconName: 'Zap',
    },
    {
      id: 4,
      title: 'Strategy Before Spending',
      description: 'We prioritize research and planning to ensure every effort has a purpose.',
      iconName: 'Target',
    },
    {
      id: 5,
      title: 'Data-Driven Decisions',
      description: 'Every optimization is guided by performance data and real insights.',
      iconName: 'BarChart3',
    },
    {
      id: 6,
      title: 'Growth Partner Mindset',
      description: 'Our success is tied to your success. We aim to become an extension of your team.',
      iconName: 'HeartHandshake',
    },
  ],
  contact: {
    email: 'hello@duckpublicity.com',
    phone: '+1 (555) 019-2834',
    address: '100 Growth Boulevard, Suite 400, San Francisco, CA',
  },
};

const sampleSubmissions = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    email: 'sarah@vertexbrands.com',
    phone: '+1 (555) 234-5678',
    company: 'Vertex Brands',
    service: 'Performance Marketing',
    message: 'Looking to scale our e-commerce performance marketing across Meta and Google.',
    status: 'New',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 2,
    name: 'Michael Ross',
    email: 'mross@apextechnologies.io',
    phone: '+1 (555) 876-5432',
    company: 'Apex Tech',
    service: 'Lead Generation',
    message: 'We need B2B lead generation campaigns targeting SaaS tech leads.',
    status: 'Contacted',
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: 3,
    name: 'Elena Rostova',
    email: 'elena@luxebeautystudio.com',
    phone: '+1 (555) 345-6789',
    company: 'Luxe Beauty',
    service: 'Meta Ads',
    message: 'Interested in retargeting and UGC creative ad scaling for Instagram.',
    status: 'Resolved',
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
];

const sampleAnalytics = [
  { id: 1, path: '/', referrer: 'https://google.com', visitor_id: 'v_170001_abc1', visit_count: 3, is_returning: 1, utm_source: 'Google Organic', utm_medium: 'None', utm_campaign: 'None', timestamp: new Date(Date.now() - 1 * 3600000).toISOString() },
  { id: 2, path: '/services', referrer: 'https://facebook.com', visitor_id: 'v_170002_xyz2', visit_count: 1, is_returning: 0, utm_source: 'Meta Ads', utm_medium: 'cpc', utm_campaign: 'Spring_Scale', timestamp: new Date(Date.now() - 3 * 3600000).toISOString() },
  { id: 3, path: '/pricing', referrer: 'https://linkedin.com', visitor_id: 'v_170003_def3', visit_count: 2, is_returning: 1, utm_source: 'LinkedIn Organic', utm_medium: 'None', utm_campaign: 'None', timestamp: new Date(Date.now() - 5 * 3600000).toISOString() },
  { id: 4, path: '/contact', referrer: 'https://duckpublicity.com', visitor_id: 'v_170001_abc1', visit_count: 4, is_returning: 1, utm_source: 'Google Organic', utm_medium: 'None', utm_campaign: 'None', timestamp: new Date(Date.now() - 12 * 3600000).toISOString() },
];

// In-Memory Database Store for pure JS fallback
const memoryStore = {
  users: [],
  site_content: {},
  form_submissions: [...sampleSubmissions],
  analytics_events: [...sampleAnalytics],
  nextSubmissionId: 4,
  nextAnalyticsId: 5,
};

let isInitialized = false;
let initPromise = null;

const initDatabase = async () => {
  if (isInitialized) return;

  if (useSqlite && db) {
    try {
      // 1. Users Table
      await sqliteRunQuery(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      const existingAdmin = await sqliteGetRow(`SELECT * FROM users WHERE username = ?`, ['admin']);
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('DuckPublicity2026!', 10);
        await sqliteRunQuery(`INSERT INTO users (username, password) VALUES (?, ?)`, ['admin', hashedPassword]);
        console.log('SQLite: Default admin created');
      }

      // 2. Site Content Table
      await sqliteRunQuery(`
        CREATE TABLE IF NOT EXISTS site_content (
          key TEXT PRIMARY KEY,
          data TEXT NOT NULL,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      for (const [key, value] of Object.entries(defaultContent)) {
        const existing = await sqliteGetRow(`SELECT * FROM site_content WHERE key = ?`, [key]);
        if (!existing) {
          await sqliteRunQuery(`INSERT INTO site_content (key, data) VALUES (?, ?)`, [key, JSON.stringify(value)]);
        }
      }

      // 3. Form Submissions Table
      await sqliteRunQuery(`
        CREATE TABLE IF NOT EXISTS form_submissions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          company TEXT,
          service TEXT,
          message TEXT,
          status TEXT DEFAULT 'New',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      const existingSubmissions = await sqliteGetAllRows(`SELECT COUNT(*) as count FROM form_submissions`);
      if (existingSubmissions[0].count === 0) {
        for (const sub of sampleSubmissions) {
          await sqliteRunQuery(
            `INSERT INTO form_submissions (name, email, phone, company, service, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [sub.name, sub.email, sub.phone, sub.company, sub.service, sub.message, sub.status, sub.created_at]
          );
        }
      }

      // 4. Analytics Events Table
      await sqliteRunQuery(`
        CREATE TABLE IF NOT EXISTS analytics_events (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          path TEXT NOT NULL,
          referrer TEXT,
          user_agent TEXT,
          visitor_id TEXT,
          visit_count INTEGER DEFAULT 1,
          is_returning INTEGER DEFAULT 0,
          utm_source TEXT DEFAULT 'Direct',
          utm_medium TEXT DEFAULT 'None',
          utm_campaign TEXT DEFAULT 'None',
          timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      const columnsToAdd = [
        'visitor_id TEXT',
        'visit_count INTEGER DEFAULT 1',
        'is_returning INTEGER DEFAULT 0',
        'utm_source TEXT DEFAULT "Direct"',
        'utm_medium TEXT DEFAULT "None"',
        'utm_campaign TEXT DEFAULT "None"'
      ];

      for (const colDef of columnsToAdd) {
        try {
          await sqliteRunQuery(`ALTER TABLE analytics_events ADD COLUMN ${colDef}`);
        } catch (colErr) {}
      }

      const existingAnalytics = await sqliteGetAllRows(`SELECT COUNT(*) as count FROM analytics_events`);
      if (existingAnalytics[0].count === 0) {
        for (const ev of sampleAnalytics) {
          await sqliteRunQuery(
            `INSERT INTO analytics_events (path, referrer, visitor_id, visit_count, is_returning, utm_source) VALUES (?, ?, ?, ?, ?, ?)`,
            [ev.path, ev.referrer, ev.visitor_id, ev.visit_count, ev.is_returning, ev.utm_source]
          );
        }
      }

      isInitialized = true;
      console.log('SQLite Database initialized successfully.');
      return;
    } catch (err) {
      console.error('Error initializing SQLite database, falling back to Pure JS Database Engine:', err);
      useSqlite = false;
    }
  }

  // Pure JS DB Fallback Initialization
  const hashedPassword = await bcrypt.hash('DuckPublicity2026!', 10);
  memoryStore.users = [{ id: 1, username: 'admin', password: hashedPassword, created_at: new Date().toISOString() }];

  for (const [key, value] of Object.entries(defaultContent)) {
    memoryStore.site_content[key] = JSON.stringify(value);
  }

  isInitialized = true;
  console.log('Pure JS Database Engine initialized successfully.');
};

const ensureDbInitialized = () => {
  if (!initPromise) {
    initPromise = initDatabase();
  }
  return initPromise;
};

// SQLite low-level helpers
const sqliteRunQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

const sqliteGetRow = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const sqliteGetAllRows = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Unified DB Exports
const runQuery = async (sql, params = []) => {
  await ensureDbInitialized();
  if (useSqlite && db) {
    return sqliteRunQuery(sql, params);
  }

  // JS Fallback Engine Query Execution
  const cleanSql = sql.trim();
  
  if (cleanSql.startsWith('UPDATE users SET password = ? WHERE id = ?')) {
    const user = memoryStore.users.find(u => u.id === Number(params[1]));
    if (user) user.password = params[0];
    return { changes: user ? 1 : 0 };
  }

  if (cleanSql.startsWith('INSERT INTO users')) {
    const newUser = { id: memoryStore.users.length + 1, username: params[0], password: params[1], created_at: new Date().toISOString() };
    memoryStore.users.push(newUser);
    return { lastID: newUser.id };
  }

  if (cleanSql.includes('INSERT INTO site_content')) {
    memoryStore.site_content[params[0]] = params[1];
    return { changes: 1 };
  }

  if (cleanSql.startsWith('INSERT INTO form_submissions')) {
    const id = memoryStore.nextSubmissionId++;
    const newSub = {
      id,
      name: params[0],
      email: params[1],
      phone: params[2] || '',
      company: params[3] || '',
      service: params[4] || 'General Inquiry',
      message: params[5] || '',
      status: params[6] || 'New',
      created_at: params[7] || new Date().toISOString()
    };
    memoryStore.form_submissions.unshift(newSub);
    return { lastID: id };
  }

  if (cleanSql.startsWith('UPDATE form_submissions SET status = ? WHERE id = ?')) {
    const sub = memoryStore.form_submissions.find(s => s.id === Number(params[1]));
    if (sub) sub.status = params[0];
    return { changes: sub ? 1 : 0 };
  }

  if (cleanSql.startsWith('DELETE FROM form_submissions WHERE id = ?')) {
    const initialLen = memoryStore.form_submissions.length;
    memoryStore.form_submissions = memoryStore.form_submissions.filter(s => s.id !== Number(params[0]));
    return { changes: initialLen - memoryStore.form_submissions.length };
  }

  if (cleanSql.startsWith('INSERT INTO analytics_events')) {
    const id = memoryStore.nextAnalyticsId++;
    const newEv = {
      id,
      path: params[0] || '/',
      referrer: params[1] || '',
      user_agent: params[2] || '',
      visitor_id: params[3] || 'v_unknown',
      visit_count: Number(params[4]) || 1,
      is_returning: params[5] ? 1 : 0,
      utm_source: params[6] || 'Direct',
      utm_medium: params[7] || 'None',
      utm_campaign: params[8] || 'None',
      timestamp: new Date().toISOString()
    };
    memoryStore.analytics_events.unshift(newEv);
    return { lastID: id };
  }

  return { changes: 0 };
};

const getRow = async (sql, params = []) => {
  await ensureDbInitialized();
  if (useSqlite && db) {
    return sqliteGetRow(sql, params);
  }

  const cleanSql = sql.trim();

  if (cleanSql.includes('SELECT * FROM users WHERE username = ?')) {
    return memoryStore.users.find(u => u.username === params[0]) || null;
  }

  if (cleanSql.includes('SELECT * FROM users WHERE id = ?')) {
    return memoryStore.users.find(u => u.id === Number(params[0])) || null;
  }

  if (cleanSql.includes('SELECT * FROM site_content WHERE key = ?')) {
    const data = memoryStore.site_content[params[0]];
    return data ? { key: params[0], data } : null;
  }

  if (cleanSql.includes('SELECT COUNT(*) as count FROM form_submissions') && cleanSql.includes('WHERE status =')) {
    const statusMatch = cleanSql.match(/WHERE status = '([^']+)'/);
    const status = statusMatch ? statusMatch[1] : params[0];
    const count = memoryStore.form_submissions.filter(s => s.status === status).length;
    return { count };
  }

  if (cleanSql.includes('SELECT COUNT(*) as count FROM form_submissions')) {
    return { count: memoryStore.form_submissions.length };
  }

  if (cleanSql.includes('SELECT COUNT(*) as count FROM analytics_events')) {
    return { count: memoryStore.analytics_events.length };
  }

  if (cleanSql.includes('SELECT COUNT(DISTINCT visitor_id) as count FROM analytics_events') && cleanSql.includes('WHERE visit_count > 1')) {
    const distinct = new Set(memoryStore.analytics_events.filter(e => e.visit_count > 1 || e.is_returning === 1).map(e => e.visitor_id));
    return { count: distinct.size };
  }

  if (cleanSql.includes('SELECT COUNT(DISTINCT visitor_id) as count FROM analytics_events')) {
    const distinct = new Set(memoryStore.analytics_events.map(e => e.visitor_id));
    return { count: distinct.size };
  }

  return null;
};

const getAllRows = async (sql, params = []) => {
  await ensureDbInitialized();
  if (useSqlite && db) {
    return sqliteGetAllRows(sql, params);
  }

  const cleanSql = sql.trim();

  if (cleanSql.includes('SELECT * FROM site_content')) {
    return Object.entries(memoryStore.site_content).map(([key, data]) => ({ key, data }));
  }

  if (cleanSql.includes('SELECT * FROM form_submissions')) {
    return [...memoryStore.form_submissions];
  }

  if (cleanSql.includes('SELECT service, COUNT(*) as count FROM form_submissions GROUP BY service')) {
    const map = {};
    memoryStore.form_submissions.forEach(s => {
      const sName = s.service || 'General Inquiry';
      map[sName] = (map[sName] || 0) + 1;
    });
    return Object.entries(map).map(([service, count]) => ({ service, count })).sort((a, b) => b.count - a.count);
  }

  if (cleanSql.includes('strftime')) {
    const map = {};
    memoryStore.form_submissions.forEach(s => {
      const dateStr = (s.created_at || '').substring(0, 10) || new Date().toISOString().substring(0, 10);
      map[dateStr] = (map[dateStr] || 0) + 1;
    });
    return Object.entries(map).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 14);
  }

  if (cleanSql.includes('SELECT path, COUNT(*) as count FROM analytics_events GROUP BY path')) {
    const map = {};
    memoryStore.analytics_events.forEach(e => {
      const p = e.path || '/';
      map[p] = (map[p] || 0) + 1;
    });
    return Object.entries(map).map(([path, count]) => ({ path, count })).sort((a, b) => b.count - a.count).slice(0, 5);
  }

  if (cleanSql.includes('FROM analytics_events')) {
    return memoryStore.analytics_events.slice(0, 10);
  }

  return [];
};

// Start init on load
ensureDbInitialized().catch(err => console.error('Database initialization start error:', err));

module.exports = {
  db,
  ensureDbInitialized,
  runQuery,
  getRow,
  getAllRows,
};

