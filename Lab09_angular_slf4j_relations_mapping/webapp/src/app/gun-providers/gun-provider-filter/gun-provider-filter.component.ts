import {Component, OnInit} from '@angular/core';
import {GunProviderService} from '../shared/gun-provider.service';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GunProvider} from '../shared/gun-provider.model';


@Component({
  selector: 'app-gun-provider-filter',
  templateUrl: './gun-provider-filter.component.html',
  styleUrls: ['./gun-provider-filter.component.css']
})
export class GunProviderFilterComponent implements OnInit {

  myForm: FormGroup;  // this will track the changes of the 2 FormControls lowerBound and upperBound
  gunProviders: GunProvider[]; // here we'll store the array from the server
  filteredGunProviders: GunProvider[] = []; // this array will be modified for filtering

  constructor(private _gunProviderService: GunProviderService,
              private _location: Location,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this._gunProviderService.getGunProviders()
      .subscribe(gunProvider => this.gunProviders = gunProvider);

    this.myForm = this._formBuilder.group({
      lowerBound: 0,
      upperBound: 10
      // upperBound: Number.MAX_SAFE_INTEGER
    });

    this.myForm.controls['lowerBound'].setValidators(
      [Validators.min(0), Validators.max(10)]
    );
    this.myForm.controls['upperBound'].setValidators(
      [Validators.min(0), Validators.max(10)]
    );

    this.myForm.valueChanges.subscribe(
      data => this.filterGunProviders(
        this.myForm.get('lowerBound').value,
        this.myForm.get('upperBound').value
      )
    );
  }

  goBack() {
    this._location.back();
  }

  filterGunProviders(lowerBound: number, upperBound: number) {
    this.filteredGunProviders = [];
    for (const gunProvider of this.gunProviders) {
      if (lowerBound <= gunProvider.reputation && gunProvider.reputation <= upperBound) {
        this.filteredGunProviders.push(gunProvider);
      }
    }
  }
}
