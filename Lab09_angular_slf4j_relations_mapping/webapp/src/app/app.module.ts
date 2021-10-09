import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import { GunTypesComponent } from './gun-types/gun-types.component';
import { GunTypeListComponent } from './gun-types/gun-type-list/gun-type-list.component';
import {GunTypeService} from './gun-types/shared/gun-type.service';

import { GunProvidersComponent } from './gun-providers/gun-providers.component';
import { GunProviderListComponent } from './gun-providers/gun-provider-list/gun-provider-list.component';
import {GunProviderService} from './gun-providers/shared/gun-provider.service';

import { ClientsComponent } from './clients/clients.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import {ClientService} from './clients/shared/client.service';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { ClientNewComponent } from './clients/client-new/client-new.component';
import { ClientDeleteComponent } from './clients/client-delete/client-delete.component';
import { GunTypeFilterComponent } from './gun-types/gun-type-filter/gun-type-filter.component';
import { GunProviderFilterComponent } from './gun-providers/gun-provider-filter/gun-provider-filter.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientListComponent,
    GunTypesComponent,
    GunTypeListComponent,
    GunProvidersComponent,
    GunProviderListComponent,
    ClientDetailComponent,
    ClientNewComponent,
    ClientDeleteComponent,
    GunTypeFilterComponent,
    GunProviderFilterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    ReactiveFormsModule
  ],
  providers: [ClientService, GunTypeService, GunProviderService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
