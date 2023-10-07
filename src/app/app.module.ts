import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@core/core.module';
import { MaterialModule } from '@material/material.module';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pl'
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
