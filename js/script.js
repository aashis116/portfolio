// ============================================================
// CONTENT DATA
// Add or edit cards here — the page renders them automatically.
// No HTML editing needed for these four sections.
// ============================================================

// "Automation focus areas" cards.
// modifier picks the accent color: web=green, api=blue, data=violet, perf=amber
// (add a new modifier + matching CSS rule in styles.css if you want a new color)
var FOCUS_AREAS = [
  {
    modifier: 'web',
    tag: 'Web automation',
    title: 'End-to-end & UI',
    desc: 'Cypress and Playwright suites covering Shopify storefronts and customer-facing flows, plus pixel-accurate UI validation against Figma.',
    chips: ['Cypress', 'Playwright', 'TypeScript', 'Cypress Cloud']
  },
  {
    modifier: 'api',
    tag: 'API automation',
    title: 'Services & integrations',
    desc: 'REST API test suites for POS transaction processing, payment workflows, and third-party integrations, validated against Swagger specs.',
    chips: ['Postman', 'Insomnia', 'Swagger']
  },
  {
    modifier: 'data',
    tag: 'Database & data QA',
    title: 'Data integrity',
    desc: 'Cross-system validation between Shopify, POS, and backend databases to confirm accuracy, correct transactions, and consistent storage.',
    chips: ['PostgreSQL', 'MongoDB']
  },
  {
    modifier: 'perf',
    tag: 'Performance & monitoring',
    title: 'Production visibility',
    desc: 'Load testing and proactive monitoring of API logs and system performance to catch regressions before they reach customers.',
    chips: ['k6', 'Grafana', 'Datadog']
  }
];

// "Chrome extension automation" cards (same card style, cyan accent).
var EXTENSIONS = [
  {
    modifier: 'ext',
    tag: 'Browser automation',
    title: 'Popay Shopify Connect',
    desc: "An 11-step Manifest V3 extension that drives the full Shopify-to-Popay POS store-connect flow end to end inside an isolated incognito window — creating the Shopify custom app, detecting and picking the right org/store, pausing for real login and 2FA, and asking for explicit confirmation before any destructive step. Turns a fragile, multi-page manual setup into a one-click, repeatable run.",
    chips: ['Manifest V3', 'Service Worker', 'Side Panel', 'OAuth flow automation']
  },
  {
    modifier: 'ext',
    tag: 'Browser automation',
    title: 'Clokio Timer Report',
    desc: "A side-panel extension that reads today's Clokio time entries straight out of the page and generates a copy-paste-ready summary, grouped by project with live task status — replacing a manual end-of-day reporting chore with one click.",
    chips: ['Manifest V3', 'Side Panel', 'JavaScript']
  }
];

// "Personal projects" cards.
var PROJECTS = [
  {
    title: 'CSV Header Mapping',
    stack: 'PHP',
    desc: 'A web app for uploading, remapping, and downloading CSV files with custom column headers — file handling and data manipulation with a user-friendly interface.'
  },
  {
    title: 'Monthly Task Scheduler',
    stack: 'MERN',
    desc: 'A full-stack task scheduler with CRUD operations and notifications, built on Node.js and MySQL.'
  },
  {
    title: 'CampusHub',
    stack: 'MERN',
    desc: 'Classroom platform with REST APIs, JWT/Passport.js auth, real-time messaging via Socket.io, and KMP-based plagiarism detection.'
  },
  {
    title: 'Collaborative Text Editor',
    stack: 'Node · Socket.io',
    desc: 'A real-time collaborative text editor supporting simultaneous multi-user editing with live synchronization.'
  }
];

// "Skills & tools" groups. Add a new group, or add an item to an existing one.
var SKILLS = [
  {
    group: 'Languages & frameworks',
    items: ['JavaScript', 'TypeScript', 'Cypress', 'Playwright']
  },
  {
    group: 'Data & tooling',
    items: ['PostgreSQL', 'MongoDB', 'Postman', 'Insomnia', 'k6', 'Grafana', 'Datadog']
  },
  {
    group: 'Process',
    items: ['Jira', 'AIO Test Management', 'Git / GitLab', 'CI/CD', 'Manual Testing']
  },
  {
    group: 'AI-assisted tooling',
    items: ['Claude Code']
  }
];

// ============================================================
// RENDERING — builds the DOM from the data above.
// You shouldn't need to touch this to add a card.
// ============================================================

function el(tag, className, text){
  var node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function buildChipRow(items){
  var row = el('div', 'chip-row');
  items.forEach(function(text){ row.appendChild(el('span', 'chip', text)); });
  return row;
}

function buildFocusCard(item){
  var card = el('div', 'focus-card ' + item.modifier);
  card.appendChild(el('div', 'tag', item.tag));
  card.appendChild(el('h3', null, item.title));
  card.appendChild(el('p', null, item.desc));
  card.appendChild(buildChipRow(item.chips));
  return card;
}

function buildProjectCard(item){
  var card = el('div', 'project-card');
  var head = el('div', 'project-head');
  head.appendChild(el('h3', null, item.title));
  head.appendChild(el('span', 'project-stack', item.stack));
  card.appendChild(head);
  card.appendChild(el('p', null, item.desc));
  return card;
}

function buildSkillGroup(group){
  var wrap = el('div', 'skill-group');
  wrap.appendChild(el('h4', null, group.group));
  wrap.appendChild(buildChipRow(group.items));
  return wrap;
}

function renderInto(containerId, items, buildFn){
  var container = document.getElementById(containerId);
  if (!container) return;
  items.forEach(function(item){ container.appendChild(buildFn(item)); });
}

renderInto('focusGrid', FOCUS_AREAS, buildFocusCard);
renderInto('extGrid', EXTENSIONS, buildFocusCard);
renderInto('projectGrid', PROJECTS, buildProjectCard);
renderInto('skillsGrid', SKILLS, buildSkillGroup);

// Mobile nav toggle
var toggle = document.getElementById('navToggle');
var links = document.getElementById('navLinks');
toggle.addEventListener('click', function(){
  var isOpen = links.classList.toggle('open');
  toggle.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', isOpen);
});
links.querySelectorAll('a').forEach(function(a){
  a.addEventListener('click', function(){
    links.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Theme toggle
var themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', function(){
  var next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  themeToggle.setAttribute('aria-label', next === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
  try { localStorage.setItem('theme', next); } catch(e) {}
});

// Hero terminal reveal sequence
var assertions = [
  "ships reliable Cypress &amp; Playwright suites (2+ yrs)",
  "automates Shopify storefront + POS API flows",
  "validates data integrity across Postgres &amp; Mongo",
  "builds Chrome extensions to automate browser workflows",
  "ships CI/CD-integrated test coverage",
  "monitors production with Grafana &amp; Datadog"
];
var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var container = document.getElementById('termLines');
var summary = document.getElementById('termSummary');

function renderLine(text, delay){
  var line = document.createElement('div');
  line.className = 'term-line';
  line.style.animationDelay = delay + 'ms';
  line.innerHTML = '<span class="tick">✓</span><span class="txt">' + text + '</span>';
  container.appendChild(line);
}

if (reduceMotion) {
  assertions.forEach(function(text){ renderLine(text, 0); });
  summary.style.opacity = 1;
} else {
  assertions.forEach(function(text, i){ renderLine(text, i * 220); });
  setTimeout(function(){
    summary.style.transition = 'opacity .4s ease';
    summary.style.opacity = 1;
  }, assertions.length * 220 + 200);
}

// Scroll-triggered section reveal
var revealEls = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach(function(el){ el.classList.add('in-view'); });
} else {
  var revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  revealEls.forEach(function(el){ revealObserver.observe(el); });
}
