import '../styles/main.scss';
import { getAuthToken, redirectToApp } from './auth';
import { App } from './app';

async function initializeApp() {
  const savedToken = getAuthToken();
  
  if (savedToken) {
    redirectToApp(savedToken);
    return;
  }

  new App();
}

// Initialize application
document.addEventListener('DOMContentLoaded', initializeApp);