import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AccueilComponent } from './accueil/accueil.component';
import { ProblemeComponent } from './probleme/probleme.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ProblemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    RouterModule.forRoot([
      {path: 'accueil',component:AccueilComponent},
      {path: 'probleme',component:ProblemeComponent},
      {path: '', redirectTo:'accueil',pathMatch:'full'},
      {path: '**', redirectTo:'accueil',pathMatch:'full'}
    ])    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
