import { Component, OnInit, EventEmitter } from '@angular/core';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { SlaughterService } from '../../services/slaughter.service';

@Component({
  selector: 'app-slaughters-list',
  templateUrl: './slaughters-list.component.html',
  styleUrls: ['./slaughters-list.component.css']
})
export class SlaughtersListComponent implements OnInit {

  slaughters: Slaughter[];
  searchLoopback = new EventEmitter<Slaughter[]>();

  constructor(
    private slaughterService: SlaughterService
  ) { }

  ngOnInit(): void {
    this.searchLoopback.subscribe(slaughters => this.initSlaughters(slaughters));
    this.slaughterService.getSlaughters(this.searchLoopback);
  }

  private initSlaughters(slaughters: Slaughter[]) {
    return this.slaughters = slaughters;
  }
}
