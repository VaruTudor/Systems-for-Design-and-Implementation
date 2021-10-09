import {Component, OnInit} from '@angular/core';
import {GunProvider} from '../shared/gun-provider.model';
import {GunProviderService} from '../shared/gun-provider.service';

@Component({
  selector: 'app-gun-provider-list',
  templateUrl: './gun-provider-list.component.html',
  styleUrls: ['./gun-provider-list.component.css']
})
export class GunProviderListComponent implements OnInit {
  gunProviders: GunProvider[];
  selectedGunProvider: GunProvider;

  constructor(private gunProviderService: GunProviderService) {
  }

  ngOnInit(): void {
    this.gunProviderService.getGunProviders()
      .subscribe(gunProvider => this.gunProviders = gunProvider);
  }

  toNumber(value: string) {
    return Number(value);
  }

  saveGunProvider(name: string, speciality: string, reputation: number) {
    const gunProvider = new GunProvider(name, speciality, reputation);
    this.gunProviderService.saveGunProvider(gunProvider)
      .subscribe(
        _ => alert('gunProvider saved!')
      );
    location.reload();
  }

  onSelect(gunProvider: GunProvider) {
    this.selectedGunProvider = gunProvider;
    alert(gunProvider.name + ' selected!');
  }

  deleteGunProvider() {
    this.gunProviderService.deleteGunProvider(this.selectedGunProvider.id)
      .subscribe(
        _ => alert(this.selectedGunProvider.name + ' deleted!')
      );
    location.reload();
  }
}
