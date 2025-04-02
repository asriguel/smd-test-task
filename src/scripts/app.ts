import { Modal } from './modal';
import { RegistrationForm } from './form';

export class App {
  private form: RegistrationForm;
  private modal: Modal;

  constructor() {
    this.modal = new Modal(this);
    this.form = new RegistrationForm(this);
  }

  public getModal(): Modal {
    return this.modal;
  }

  public getForm(): RegistrationForm {
    return this.form;
  }
} 