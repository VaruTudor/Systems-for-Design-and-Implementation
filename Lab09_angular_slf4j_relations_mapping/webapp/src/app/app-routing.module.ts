import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientsComponent} from './clients/clients.component';
import {GunTypesComponent} from './gun-types/gun-types.component';
import {GunProvidersComponent} from './gun-providers/gun-providers.component';
import {ClientDetailComponent} from './clients/client-detail/client-detail.component';
import {ClientNewComponent} from './clients/client-new/client-new.component';
import {ClientDeleteComponent} from './clients/client-delete/client-delete.component';
import {GunTypeFilterComponent} from './gun-types/gun-type-filter/gun-type-filter.component';
import {GunProviderFilterComponent} from './gun-providers/gun-provider-filter/gun-provider-filter.component';


const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },

  {path: 'clients', component: ClientsComponent},
  {path: 'clients/details/:id', component: ClientDetailComponent},
  {path: 'client-new', component: ClientNewComponent},
  {path: 'client-delete', component: ClientDeleteComponent},

  {path: 'gunTypes', component: GunTypesComponent},
  {path: 'gunType-filter', component: GunTypeFilterComponent},


  {path: 'gunProviders', component: GunProvidersComponent},
  {path: 'gunProvider-filter', component: GunProviderFilterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
