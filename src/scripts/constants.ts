export const AUTH_TOKEN_KEY = 'dating_auth_token';
export const API_URL = 'https://api.dating.com/identity';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD_LENGTH = 8;

export const STORAGE = {
  AUTH_TOKEN: 'authToken'
} as const;

export const REDIRECT = {
  URL: 'https://www.dating.com/people/#token=',
  DELAY_MS: 2000
} as const;

export const SELECTORS = {
  FORM: '.js-form',
  EMAIL: '.js-email-input',
  PASSWORD: '.js-password-input',
  EMAIL_ERROR: '.js-email-error',
  PASSWORD_ERROR: '.js-password-error',
  SUBMIT_BUTTON: '.js-submit-button',
  MODAL: '.modal',
  MODAL_CONTAINER: '.modal__container',
  MODAL_CONTENT: '.modal__content',
  MODAL_CLOSE: '.js-modal-close',
  MODAL_TRIGGER: '.js-modal-trigger',
  FORM_TEMPLATE: '#registration-form-template',
  THANK_YOU_TEMPLATE: '#thank-you-template',
  SUCCESS_TITLE: '.modal__title--success'
} as const;

export const VALIDATION = {
  EMAIL: {
    REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MIN_LENGTH: 1,
    ERROR_MESSAGE: 'Please enter a valid email address',
    REQUIRED_MESSAGE: 'Email is required'
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    ERROR_MESSAGE: 'Password must be at least 8 characters long',
    REQUIRED_MESSAGE: 'Password is required'
  },
  AUTH: {
    ERROR_MESSAGE: 'Authentication failed. Please try again.'
  }
} as const; 