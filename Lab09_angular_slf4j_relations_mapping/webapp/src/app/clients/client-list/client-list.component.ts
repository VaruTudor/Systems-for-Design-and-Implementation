import {Component, OnInit} from '@angular/core';
import {Client} from '../shared/client.model';
import {ClientService} from '../shared/client.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[];
  selectedClient: Client;
  errorMessage: string;

  constructor(private clientService: ClientService,
              private location: Location,
              private router: Router) {
  }

  ngOnInit(): void {
    this.clientService.getClients()
      .subscribe(clients => this.clients = clients); // when we receive the clients array (from service),
    // we can initialize our array
  }

  getClient() {
    this.clientService.getClients()
      .subscribe(
        clients => this.clients = clients,
        error => this.errorMessage = <any>error
      );
  }

  onSelect(client: Client): void {
    this.selectedClient = client;
    this.router.navigate(['/clients/details', this.selectedClient.id]);
  }

}
