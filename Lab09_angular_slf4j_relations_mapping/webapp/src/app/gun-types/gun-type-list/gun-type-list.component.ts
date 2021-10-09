import {Component, OnInit} from '@angular/core';
import {GunType} from '../shared/gun-type.model';
import {GunTypeService} from '../shared/gun-type.service';
import {GunProvider} from '../../gun-providers/shared/gun-provider.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-gun-type-list',
  templateUrl: './gun-type-list.component.html',
  styleUrls: ['./gun-type-list.component.css']
})
export class GunTypeListComponent implements OnInit {
  gunTypes: GunType[];
  selectedGunType: GunType;
  gunProviders: GunProvider[];
  selectedGunProvider: GunProvider;

  constructor(private gunTypeService: GunTypeService) {
  }

  ngOnInit(): void {
    this.gunTypeService.getGunTypes()
      .subscribe(gunTypes => this.gunTypes = gunTypes);

    this.gunTypeService.getGunProviders()
      .subscribe(gunProviders => this.gunProviders = gunProviders); //attendance
  }

  saveGunType(name: string, category: string) {

    const gunType = new GunType(name, category, this.selectedGunProvider);
    this.gunTypeService.saveGunType(gunType)
      .subscribe(
        _ => alert('gunType saved!')
      );
    location.reload();
  }

  onSelect(gunProvider: GunProvider): void {
    this.selectedGunProvider = gunProvider;
    alert(gunProvider.name + ' selected!');
  }

  onSelectGunType(gunType: GunType): void {
    console.log(gunType);
    this.selectedGunType = gunType;
    alert(gunType.name + ' selected!');
  }

  deleteGunType() {
    this.gunTypeService.deleteGunType(this.selectedGunType.id)
      .subscribe(
        _ => alert(this.selectedGunType.name + ' deleted!')
      );
    location.reload();
  }
}
