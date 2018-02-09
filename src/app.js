const branding = document.querySelector('#branding-style');

switch (location.hostname) {
  case 'www.base.com':
    branding.setAttribute('href', 'styles/base-theme.css');
    break;
  
  case 'www.taf.com':
    branding.setAttribute('href', 'styles/brand1-theme.css');
    break;
}