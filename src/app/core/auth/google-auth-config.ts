import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../../../environments/environment';

export const googleAuthCodeFlowConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin + environment.redirectUri,
  clientId: environment.googleLoginProvider,
  scope: 'openid profile email',
  strictDiscoveryDocumentValidation: false,
  showDebugInformation: false,
  clearHashAfterLogin: false,
};
