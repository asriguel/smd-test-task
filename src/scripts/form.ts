import { SELECTORS, VALIDATION, REDIRECT } from './constants';
import { authenticate, saveAuthToken, redirectToApp } from './auth';
import { App } from './app';

export class RegistrationForm {
  private form: HTMLFormElement | null;
  private emailInput: HTMLInputElement | null;
  private passwordInput: HTMLInputElement | null;
  private emailError: HTMLElement | null;
  private passwordError: HTMLElement | null;
  private submitButton: HTMLButtonElement | null;
  private app: App;

  constructor(app: App) {
    this.app = app;
    this.form = document.querySelector(SELECTORS.FORM);
    this.emailInput = document.querySelector(SELECTORS.EMAIL);
    this.passwordInput = document.querySelector(SELECTORS.PASSWORD);
    this.emailError = document.querySelector(SELECTORS.EMAIL_ERROR);
    this.passwordError = document.querySelector(SELECTORS.PASSWORD_ERROR);
    this.submitButton = document.querySelector(SELECTORS.SUBMIT_BUTTON);

    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    if (!this.form || !this.emailInput || !this.passwordInput || !this.emailError || !this.passwordError || !this.submitButton) return;

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    this.emailInput.addEventListener('focus', () => this.clearError(this.emailInput!, this.emailError!));
    this.emailInput.addEventListener('blur', () => {
      if (this.emailInput?.value) {
        this.validateField(
          this.emailInput,
          this.validateEmail,
          this.emailError!,
          VALIDATION.EMAIL.ERROR_MESSAGE
        );
      }
    });

    // Password validation
    this.passwordInput.addEventListener('focus', () => this.clearError(this.passwordInput!, this.passwordError!));
    this.passwordInput.addEventListener('blur', () => {
      if (this.passwordInput?.value) {
        this.validateField(
          this.passwordInput,
          this.validatePassword,
          this.passwordError!,
          VALIDATION.PASSWORD.ERROR_MESSAGE
        );
      }
    });
  }

  private validateEmail = (email: string): boolean => {
    return VALIDATION.EMAIL.REGEX.test(email);
  };

  private validatePassword = (password: string): boolean => {
    return password.length >= VALIDATION.PASSWORD.MIN_LENGTH;
  };

  private showError(input: HTMLInputElement | null, errorElement: HTMLElement | null, message: string): void {
    if (!input || !errorElement) return;
    input.parentElement?.classList.add('has-error');
    errorElement.textContent = message;
  }

  private clearError(input: HTMLInputElement | null, errorElement: HTMLElement | null): void {
    if (!input || !errorElement) return;
    input.parentElement?.classList.remove('has-error');
    errorElement.textContent = '';
  }

  private validateField(
    input: HTMLInputElement,
    validator: (value: string) => boolean,
    errorElement: HTMLElement,
    errorMessage: string
  ): boolean {
    if (input.value && !validator(input.value)) {
      this.showError(input, errorElement, errorMessage);
      return false;
    } else {
      this.clearError(input, errorElement);
      return true;
    }
  }

  private setLoading(isLoading: boolean): void {
    if (!this.submitButton) return;
    
    if (isLoading) {
      this.submitButton.disabled = true;
      this.submitButton.classList.add('button--loading');
    } else {
      this.submitButton.disabled = false;
      this.submitButton.classList.remove('button--loading');
    }
  }

  public reset(): void {
    if (this.form) {
      this.form.reset();
      this.clearErrors();
    }
  }

  private clearErrors(): void {
    this.clearError(this.emailInput, this.emailError);
    this.clearError(this.passwordInput, this.passwordError);
  }

  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    if (!this.emailInput || !this.passwordInput || !this.emailError || !this.passwordError || !this.submitButton) return;

    let isValid = true;

    // Validate email
    if (!this.emailInput.value) {
      this.showError(this.emailInput, this.emailError, VALIDATION.EMAIL.REQUIRED_MESSAGE);
      isValid = false;
    } else if (!this.validateEmail(this.emailInput.value)) {
      this.showError(this.emailInput, this.emailError, VALIDATION.EMAIL.ERROR_MESSAGE);
      isValid = false;
    }

    // Validate password
    if (!this.passwordInput.value) {
      this.showError(this.passwordInput, this.passwordError, VALIDATION.PASSWORD.REQUIRED_MESSAGE);
      isValid = false;
    } else if (!this.validatePassword(this.passwordInput.value)) {
      this.showError(this.passwordInput, this.passwordError, VALIDATION.PASSWORD.ERROR_MESSAGE);
      isValid = false;
    }

    if (isValid) {
      this.setLoading(true);
      try {
        const token = await authenticate(this.emailInput.value, this.passwordInput.value);
        saveAuthToken(token);
        this.showThankYouScreen();
        setTimeout(() => {
          redirectToApp(token);
        }, REDIRECT.DELAY_MS);
      } catch (error) {
        console.error('Authentication error:', error);
        this.showError(this.emailInput, this.emailError, VALIDATION.AUTH.ERROR_MESSAGE);
      } finally {
        this.setLoading(false);
      }
    }
  }

  private showThankYouScreen(): void {
    this.app.getModal().showThankYouScreen();
  }
} 