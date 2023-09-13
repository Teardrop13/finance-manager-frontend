import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '@material/material.module';
import { EnsureModuleLoadedOnceGuard } from './EnsureModuleLoadedOnceGuard';
import { LoginComponent } from './authentication/components/login/login.component';
import { RegistrationComponent } from './authentication/components/registration/registration.component';
import { TokenSharing } from './authentication/services/token-sharing.service';
import { NavbarComponent } from './header/navbar/navbar.component';
import { AuthenticationInterceptorService } from './interceptors/authentication-interceptor.service';
@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [
    TokenSharing,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorService,
      multi: true
    }
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
