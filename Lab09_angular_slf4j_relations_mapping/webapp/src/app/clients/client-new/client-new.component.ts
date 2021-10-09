import {Component, OnInit} from '@angular/core';
import {ClientService} from '../shared/client.service';
import {Client} from '../shared/client.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.css']
})
export class ClientNewComponent implements OnInit {

  constructor(private clientService: ClientService,
              private _location: Location) {
  }

  ngOnInit(): void {
  }

  saveClient(name: string, dateOfBirth: Date) {
    const client = new Client(name, dateOfBirth);
    this.clientService.saveClient(client)
      .subscribe(
        client => console.log('saved -> ', client),
        error => alert('error: ' + error)
      );
  }

  toDate(date: string) {
    return new Date(date);
  }


  goBack() {
    this._location.back();
  }
}
