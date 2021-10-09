import {Component, OnInit} from '@angular/core';
import {GunTypeService} from '../shared/gun-type.service';
import {Location} from '@angular/common';
import {GunType} from '../shared/gun-type.model';

@Component({
  selector: 'app-gun-type-filter',
  templateUrl: './gun-type-filter.component.html',
  styleUrls: ['./gun-type-filter.component.css']
})
export class GunTypeFilterComponent implements OnInit {
  filteredGunTypes: GunType[];
  currentCategory: string;
  errorMessage: string;

  constructor(private _gunTypeService: GunTypeService,
              private _location: Location) {
  }

  ngOnInit(): void {
  }

  public goBack(): void {
    this._location.back();
  }

  filter() {
    this._gunTypeService.filterGunTypesByCategory(this.currentCategory)
      .subscribe(
        gunTypesFromServer => this.filteredGunTypes = gunTypesFromServer,
        error => alert('There is no such category'));
    // console.log(value);
  }
}
