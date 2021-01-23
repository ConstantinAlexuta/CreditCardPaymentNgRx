import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from 'src/store/reducers';

import { ClientModule } from './components/client/client.module';
import { ClientResolver } from './components/client/resolver/client.resolver';

import { CcpModule } from './components/ccp/ccp.module';
import { CcpResolver } from './components/ccp/resolver/ccp.resolver';

@NgModule({
  declarations: [AppComponent],

  imports: [
    ClientModule,
    CcpModule,

    FormsModule,
    ReactiveFormsModule,
    NgbModule,

    HttpClientModule,
    BrowserModule,

    AppRoutingModule,

    EffectsModule.forRoot([]),

    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [ClientResolver, CcpResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
