/* ========================================
   STUDENT REMINDER APP
   Problem #4: Dashboard / Reminder UI Logic

   Relies on the existing HTTP-only sid cookie.
   Session IDs are NEVER read, stored, or
   exposed via JavaScript.
   ======================================== */

const AUTH_PAGE = '/auth.html';
const API_ME = '/api/auth/me';
const API_REMINDERS = '/api/reminders';
const API_LOGOUT = '/api/auth/logout';

function getElement(id) {
  return document.getElementById(id);
}

function showPageError(message) {
  const el = getElement('pageError');
  if (el) {
    el.textContent = message;
    el.hidden = false;
  }
}

function clearPageError() {
  const el = getElement('pageError');
  if (el) {
    el.hidden = true;
  }
}

function redirectToAuth() {
  window.location.href = AUTH_PAGE;
}

/**
 * Generic API call. Returns { status, body }.
 * Never throws for HTTP error statuses.
 */
async function api(url, options) {
  let res;
  try {
    res = await fetch(url, options);
  } catch (err) {
    return { status: 0, body: null };
  }

  let body = null;
  try {
    body = await res.json();
  } catch (err) {
    body = null;
  }

  return { status: res.status, body };
}

function safeMessage(res, fallback) {
  if (res.body && Array.isArray(res.body.errors)) {
    return res.body.errors.join(' ');
  }
  if (res.body && typeof res.body.message === 'string') {
    return res.body.message;
  }
  return fallback;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, function (ch) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return map[ch];
  });
}

function formatDue(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value || '';
  }
  return date.toLocaleString();
}

// ========================================
// Session + initial load
// ========================================
async function init() {
  const me = await api(API_ME, { method: 'GET', credentials: 'include' });

  if (me.status === 401) {
    redirectToAuth();
    return;
  }

  if (me.status !== 200 || !me.body || !me.body.user) {
    showPageError('Unable to load your session. Please try again.');
    return;
  }

  renderUser(me.body.user);
  await loadReminders();
}

function renderUser(user) {
  const welcome = getElement('welcome');
  const userInfo = getElement('userInfo');
  const logoutBtn = getElement('logoutBtn');

  if (welcome) {
    welcome.textContent = 'Signed in as ' + user.name + ' (' + user.email + ')';
  }
  if (userInfo) {
    userInfo.textContent = user.name;
    userInfo.hidden = false;
  }
  if (logoutBtn) {
    logoutBtn.hidden = false;
  }
}

// ========================================
// Reminders
// ========================================
async function loadReminders() {
  const res = await api(API_REMINDERS, { method: 'GET', credentials: 'include' });

  if (res.status === 401) {
    redirectToAuth();
    return;
  }

  if (res.status !== 200 || !Array.isArray(res.body.reminders)) {
    showPageError('Could not load your reminders. Please try again.');
    return;
  }

  renderReminders(res.body.reminders);
  clearPageError();
}

function renderReminders(reminders) {
  const container = getElement('remindersList');
  const emptyState = getElement('emptyState');

  if (!container) {
    return;
  }

  container.innerHTML = '';

  if (reminders.length === 0) {
    if (emptyState) {
      emptyState.hidden = false;
    }
    return;
  }

  if (emptyState) {
    emptyState.hidden = true;
  }

  reminders.forEach(function (reminder) {
    const item = document.createElement('article');
    item.className = 'card';
    item.dataset.id = reminder.id;

    const isCompleted = reminder.status === 'completed';

    const body = document.createElement('div');
    body.className = 'card-body d-flex justify-between items-center gap-3';

    const info = document.createElement('div');
    info.className = 'flex-1';

    const title = document.createElement('h3');
    title.className = 'mb-1';
    title.textContent = reminder.title;

    const meta = document.createElement('p');
    meta.className = 'text-secondary mb-1';
    meta.textContent = 'Due: ' + formatDue(reminder.due_date) +
      ' · Priority: ' + reminder.priority +
      ' · Status: ' + reminder.status;

    info.appendChild(title);
    if (reminder.description) {
      const desc = document.createElement('p');
      desc.className = 'mb-1';
      desc.textContent = reminder.description;
      info.appendChild(desc);
    }
    info.appendChild(meta);

    const actions = document.createElement('div');
    actions.className = 'd-flex gap-2';

    if (!isCompleted) {
      const completeBtn = document.createElement('button');
      completeBtn.type = 'button';
      completeBtn.className = 'btn btn-success btn-sm';
      completeBtn.dataset.action = 'complete';
      completeBtn.textContent = 'Complete';
      actions.appendChild(completeBtn);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.className = 'btn btn-danger btn-sm';
    deleteBtn.dataset.action = 'delete';
    deleteBtn.textContent = 'Delete';
    actions.appendChild(deleteBtn);

    body.appendChild(info);
    body.appendChild(actions);
    item.appendChild(body);
    container.appendChild(item);
  });
}

// ========================================
// Create
// ========================================
async function handleCreate(event) {
  event.preventDefault();
  clearPageError();

  const title = getElement('remTitle').value.trim();
  const dueEl = getElement('remDue');
  const description = getElement('remDesc').value.trim();
  const priority = getElement('remPriority').value;

  if (!title) {
    showPageError('Title is required.');
    return;
  }

  if (!dueEl.value) {
    showPageError('Due date and time is required.');
    return;
  }

  // datetime-local -> 'YYYY-MM-DD HH:MM:SS' (matches the MySQL DATETIME the API accepts)
  const dueDate = dueEl.value.replace('T', ' ') + ':00';

  const payload = {
    title: title,
    due_date: dueDate,
    priority: priority
  };

  if (description) {
    payload.description = description;
  }

  const res = await api(API_REMINDERS, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'x-api-request': 'true'
    },
    body: JSON.stringify(payload)
  });

  if (res.status === 201) {
    getElement('createForm').reset();
    getElement('remPriority').value = 'medium';
    await loadReminders();
    return;
  }

  if (res.status === 401) {
    redirectToAuth();
    return;
  }

  showPageError(safeMessage(res, 'Could not create the reminder. Please try again.'));
}

// ========================================
// Complete / Delete (event delegation)
// ========================================
async function handleAction(event) {
  const button = event.target.closest('button[data-action]');
  if (!button) {
    return;
  }

  const card = button.closest('article[data-id]');
  if (!card) {
    return;
  }

  const id = card.dataset.id;
  const action = button.dataset.action;

  if (action === 'complete') {
    const res = await api(API_REMINDERS + '/' + id, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-api-request': 'true'
      },
      body: JSON.stringify({ status: 'completed' })
    });

    if (res.status === 200) {
      await loadReminders();
      return;
    }

    if (res.status === 401) {
      redirectToAuth();
      return;
    }

    showPageError('Could not complete the reminder. Please try again.');
  }

  if (action === 'delete') {
    if (!window.confirm('Delete this reminder?')) {
      return;
    }

    const res = await api(API_REMINDERS + '/' + id, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'x-api-request': 'true'
      }
    });

    if (res.status === 200) {
      await loadReminders();
      return;
    }

    if (res.status === 401) {
      redirectToAuth();
      return;
    }

    showPageError('Could not delete the reminder. Please try again.');
  }
}

// ========================================
// Logout
// ========================================
async function handleLogout() {
  const res = await api(API_LOGOUT, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'x-api-request': 'true'
    }
  });

  if (res.status === 200 || res.status === 401) {
    window.location.href = AUTH_PAGE;
    return;
  }

  showPageError('Could not log out. Please try again.');
}

// ========================================
// Wire up
// ========================================
function initPage() {
  const createForm = getElement('createForm');
  const remindersList = getElement('remindersList');
  const logoutBtn = getElement('logoutBtn');

  if (createForm) {
    createForm.addEventListener('submit', handleCreate);
  }
  if (remindersList) {
    remindersList.addEventListener('click', handleAction);
  }
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }

  init();
}

document.addEventListener('DOMContentLoaded', initPage);