'use Client';

const AUTHENTICATED_FIELD = 'correct_spell';
const EMAIL_FIELD = 'email_sent';

export async function setAuthenticated() {
  localStorage.setItem(AUTHENTICATED_FIELD, 'true');
}

export function isAuthenticated() {
  return localStorage.getItem(AUTHENTICATED_FIELD) != null;
}

export async function setEmailSent() {
  localStorage.setItem(EMAIL_FIELD, 'true');
}

export function wasEmailSent() {
  return localStorage.getItem(EMAIL_FIELD) != null;
}
