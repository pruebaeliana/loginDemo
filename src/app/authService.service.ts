import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService, OAuthEvent } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService) {
    this.initLogin();
    this.setupEvents();
  }

  initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '137730433993-5o2skvt351afu1f162o5nv721fta48cl.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/home',
      //redirectUri: 'https://uat-plataforma.eldars.com.ar/get-id-token',
      scope: 'profile email',
    }

    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  getProfile() {
    return this.oauthService.getIdentityClaims();
  }

  private setupEvents() {
    this.oauthService.events
      .pipe(filter((event: OAuthEvent) => event.type === 'token_received'))
      .subscribe(() => {
        this.handleTokenReceived();
      });
  }

  private handleTokenReceived() {
    alert('Autenticación exitosa. Ejecutar método aquí.');
  }

}
