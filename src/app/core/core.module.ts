import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { EnsureModuleLoadedOnceGuard } from './EnsureModuleLoadedOnceGuard';
import { LoginComponent } from './authentication/components/login/login.component';
import { RegistrationComponent } from './authentication/components/registration/registration.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { RouterModule } from '@angular/router';
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
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
