import {Component, OnInit} from '@angular/core';
import {ClientService} from '../shared/client.service';
import {Location} from '@angular/common';
import {Client} from '../shared/client.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-client-delete',
  templateUrl: './client-delete.component.html',
  styleUrls: ['./client-delete.component.css']
})
export class ClientDeleteComponent implements OnInit {
  myForm: FormGroup;
  clients: Client[];
  clientsWithName: Client[] = [];
  selectedClient: Client;

  constructor(private _clientService: ClientService,
              private _location: Location,
              private _router: Router,
              private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this._clientService.getClients()
      .subscribe(clients => this.clients = clients);

    this.myForm = this._formBuilder.group({
      name: ''
    });

    this.myForm.controls['name'].setValidators(
      [Validators.required]
    );

    this.myForm.valueChanges.subscribe(
      data => this.filterClientsByName(
        this.myForm.get('name').value
      )
    );
  }

  deleteClient() {
    this._clientService.deleteClient(this.selectedClient.id)
      .subscribe(
        clientId => console.log('deleted -> ', clientId),
        error => alert('error: ' + error)
      );
    this._router.navigate(['/clients'])
      .then(
        () => window.location.reload()
      );
  }

  toNumber(input: string) {
    return Number(input);
  }

  goBack() {
    this._location.back();
  }

  onSelect(client: Client) {
    this.selectedClient = client;
    alert('client [' + client.name + '] selected');
  }

  private filterClientsByName(startingWith: string) {
    this.clientsWithName = [];
    for (const client of this.clients) {
      if (client.name.startsWith(startingWith)) {
        this.clientsWithName.push(client);
      }
    }
  }
}
