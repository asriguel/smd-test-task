import { SELECTORS } from './constants';
import { App } from './app';

export class Modal {
  private modal: Element | null;
  private modalContainer: Element | null;
  private modalCloseButtons: NodeListOf<Element>;
  private formTemplate: HTMLTemplateElement | null;
  private thankYouTemplate: HTMLTemplateElement | null;
  private app: App;

  constructor(app: App) {
    this.app = app;
    this.modal = document.querySelector(SELECTORS.MODAL);
    this.modalContainer = document.querySelector(SELECTORS.MODAL_CONTAINER);
    this.modalCloseButtons = document.querySelectorAll(SELECTORS.MODAL_CLOSE);
    this.formTemplate = document.querySelector<HTMLTemplateElement>(SELECTORS.FORM_TEMPLATE);
    this.thankYouTemplate = document.querySelector<HTMLTemplateElement>(SELECTORS.THANK_YOU_TEMPLATE);

    this.initializeEventListeners();
  }

  private initializeEventListeners(): void {
    // Open modal triggers
    document.querySelectorAll(SELECTORS.MODAL_TRIGGER).forEach(trigger => {
      trigger.addEventListener('click', () => this.open());
    });

    // Close modal triggers
    this.modalCloseButtons.forEach(button => {
      button.addEventListener('click', () => this.close());
    });

    // Close on overlay click
    this.modal?.addEventListener('click', (event) => {
      if (this.modalContainer && !this.modalContainer.contains(event.target as Node)) {
        this.close();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.modal?.classList.contains('is-active')) {
        this.close();
      }
    });
  }

  public open(): void {
    this.modal?.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  public close(): void {
    this.modal?.classList.remove('is-active');
    document.body.style.overflow = '';
    
    const modalContent = this.modal?.querySelector(SELECTORS.MODAL_CONTENT);
    if (modalContent?.querySelector(SELECTORS.SUCCESS_TITLE) && this.formTemplate) {
      modalContent.innerHTML = '';
      const newContent = this.formTemplate.content.cloneNode(true);
      modalContent.appendChild(newContent);
    }

    // Reset form and clear errors
    this.app.getForm().reset();
  }

  public showThankYouScreen(): void {
    const modalContent = this.modal?.querySelector(SELECTORS.MODAL_CONTENT);
    if (modalContent && this.thankYouTemplate) {
      modalContent.innerHTML = '';
      const newContent = this.thankYouTemplate.content.cloneNode(true);
      modalContent.appendChild(newContent);
    }
  }
} 