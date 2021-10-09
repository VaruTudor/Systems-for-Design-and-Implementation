import {Component, Input, OnInit} from '@angular/core';
import {ClientService} from '../shared/client.service';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Client} from '../shared/client.model';
import {Location} from '@angular/common';
import {GunType} from '../../gun-types/shared/gun-type.model';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  gunTypes: GunType[];
  @Input() client: Client;

  constructor(private clientService: ClientService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params: Params) => this.clientService.getClient(+params['id'])))
      // .pipe(switchMap((params: Params) => this.clientService.getClient(+params['id'])))
      .subscribe(client => this.client = client);

    this.route.params
      .pipe(switchMap((params: Params) => this.clientService.getGunTypesOfClient(+params['id'])))
      .subscribe(gunTypes => this.gunTypes = gunTypes);

  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.clientService.update(this.client)
      .subscribe(_ => this.goBack());
  }

  saveGunType(name: string, price: number): void {
    this.clientService.addGunTypeToClient(
      this.client.id,
      name,
      price
    ).subscribe(gunType => this.gunTypes.push(gunType));
  }

  toNumber(input: string) {
    return Number(input);
  }
}
