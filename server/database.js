const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const isVercel = process.env.VERCEL || process.env.NOW_BUILDER;
const dbPath = isVercel ? path.join('/tmp', 'database.sqlite') : path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Helper promise wrappers for sqlite3
const runQuery = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
};

const getRow = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const getAllRows = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

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

// Sample Form Submissions for seed analytics
const sampleSubmissions = [
  {
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

// Initializing Database Tables
const initDatabase = async () => {
  try {
    // 1. Users Table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Check if admin user exists, else create default admin user
    const existingAdmin = await getRow(`SELECT * FROM users WHERE username = ?`, ['admin']);
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('DuckPublicity2026!', 10);
      await runQuery(`INSERT INTO users (username, password) VALUES (?, ?)`, ['admin', hashedPassword]);
      console.log('Database: Default admin created (username: admin)');
    }

    // 2. Site Content Table
    await runQuery(`
      CREATE TABLE IF NOT EXISTS site_content (
        key TEXT PRIMARY KEY,
        data TEXT NOT NULL,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Seed default content sections if missing
    for (const [key, value] of Object.entries(defaultContent)) {
      const existing = await getRow(`SELECT * FROM site_content WHERE key = ?`, [key]);
      if (!existing) {
        await runQuery(`INSERT INTO site_content (key, data) VALUES (?, ?)`, [key, JSON.stringify(value)]);
      }
    }

    // 3. Form Submissions Table
    await runQuery(`
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

    // Seed sample submissions if table is empty
    const existingSubmissions = await getAllRows(`SELECT COUNT(*) as count FROM form_submissions`);
    if (existingSubmissions[0].count === 0) {
      for (const sub of sampleSubmissions) {
        await runQuery(
          `INSERT INTO form_submissions (name, email, phone, company, service, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [sub.name, sub.email, sub.phone, sub.company, sub.service, sub.message, sub.status, sub.created_at]
        );
      }
    }

    // 4. Analytics Events Table (with Cookie Visitor Tracking)
    await runQuery(`
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

    // Safe column migrations for existing SQLite database
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
        await runQuery(`ALTER TABLE analytics_events ADD COLUMN ${colDef}`);
      } catch (colErr) {
        // Column already exists, ignore
      }
    }

    // Seed sample analytics cookie records if empty
    const existingAnalytics = await getAllRows(`SELECT COUNT(*) as count FROM analytics_events`);
    if (existingAnalytics[0].count === 0) {
      const sampleEvents = [
        { path: '/', referrer: 'https://google.com', visitor_id: 'v_170001_abc1', visit_count: 3, is_returning: 1, utm_source: 'Google Organic' },
        { path: '/services', referrer: 'https://facebook.com', visitor_id: 'v_170002_xyz2', visit_count: 1, is_returning: 0, utm_source: 'Meta Ads' },
        { path: '/pricing', referrer: 'https://linkedin.com', visitor_id: 'v_170003_def3', visit_count: 2, is_returning: 1, utm_source: 'LinkedIn Organic' },
        { path: '/contact', referrer: 'https://duckpublicity.com', visitor_id: 'v_170001_abc1', visit_count: 4, is_returning: 1, utm_source: 'Google Organic' },
      ];

      for (const ev of sampleEvents) {
        await runQuery(
          `INSERT INTO analytics_events (path, referrer, visitor_id, visit_count, is_returning, utm_source) VALUES (?, ?, ?, ?, ?, ?)`,
          [ev.path, ev.referrer, ev.visitor_id, ev.visit_count, ev.is_returning, ev.utm_source]
        );
      }
    }

    console.log('Database initialized successfully with tables, cookie tracking columns, and seed data.');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
};

initDatabase();

module.exports = {
  db,
  runQuery,
  getRow,
  getAllRows,
};
