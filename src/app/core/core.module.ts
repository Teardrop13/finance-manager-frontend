import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { EnsureModuleLoadedOnceGuard } from './EnsureModuleLoadedOnceGuard';
import { LoginComponent } from './authentication/components/login/login.component';
import { RegistrationComponent } from './authentication/components/registration/registration.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
