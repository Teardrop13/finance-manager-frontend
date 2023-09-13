import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@core/authentication/components/login/login.component';
import { RegistrationComponent } from '@core/authentication/components/registration/registration.component';
import { authGuard } from '@core/guards/authentication.guard';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () => import('@features/features.module').then(m => m.FeaturesModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
