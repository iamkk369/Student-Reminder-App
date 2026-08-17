/* ========================================
   STUDENT REMINDER APP
   Problem #4: Auth Page Logic

   Handles login and registration from the
   browser, using the existing HTTP-only
   session cookie. Session IDs are NEVER
   read, stored, or exposed via JavaScript.
   ======================================== */

const AUTH_PAGE = '/auth.html';
const APP_PAGE = '/app.html';
const API_LOGIN = '/api/auth/login';
const API_REGISTER = '/api/auth/register';

function getElement(id) {
  return document.getElementById(id);
}

function showError(message) {
  const el = getElement('authError');
  if (el) {
    el.textContent = message;
    el.hidden = false;
  }
}

function clearError() {
  const el = getElement('authError');
  if (el) {
    el.hidden = true;
  }
}

/**
 * Post JSON to the API with the required
 * x-api-request header and credentials.
 * Returns { status, body, message }.
 */
async function apiPost(url, payload) {
  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-request': 'true'
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    });
  } catch (err) {
    return { status: 0, body: null, message: 'Network error. Please check your connection and try again.' };
  }

  let body = null;
  try {
    body = await res.json();
  } catch (err) {
    body = null;
  }

  let message;
  switch (res.status) {
    case 400:
      message = body && Array.isArray(body.errors)
        ? body.errors.join(' ')
        : 'Please check the form and try again.';
      break;
    case 401:
      message = 'Invalid email or password.';
      break;
    case 403:
      message = 'This request was not allowed. Please refresh and try again.';
      break;
    case 404:
      message = 'The requested resource was not found.';
      break;
    case 409:
      message = 'An account with this email already exists.';
      break;
    case 429:
      message = 'Too many attempts. Please wait a few minutes and try again.';
      break;
    case 500:
      message = 'Something went wrong on our end. Please try again later.';
      break;
    default:
      message = 'Something went wrong. Please try again.';
  }

  return { status: res.status, body, message };
}

async function handleLogin(event) {
  event.preventDefault();
  clearError();

  const email = getElement('loginEmail').value.trim();
  const password = getElement('loginPassword').value;

  if (!email || !password) {
    showError('Please enter your email and password.');
    return;
  }

  const result = await apiPost(API_LOGIN, { email, password });

  if (result.status === 200) {
    window.location.href = APP_PAGE;
    return;
  }

  showError(result.message);
}

async function handleRegister(event) {
  event.preventDefault();
  clearError();

  const name = getElement('regName').value.trim();
  const email = getElement('regEmail').value.trim();
  const password = getElement('regPassword').value;

  if (!name || !email || !password) {
    showError('Please fill in all fields.');
    return;
  }

  if (password.length < 8 || password.length > 128) {
    showError('Password must be between 8 and 128 characters.');
    return;
  }

  const result = await apiPost(API_REGISTER, { name, email, password });

  if (result.status === 201) {
    // The register endpoint creates a session and sets the
    // HttpOnly sid cookie, so the user is already signed in.
    window.location.href = APP_PAGE;
    return;
  }

  showError(result.message);
}

function init() {
  const loginForm = getElement('loginForm');
  const registerForm = getElement('registerForm');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
}

document.addEventListener('DOMContentLoaded', init);