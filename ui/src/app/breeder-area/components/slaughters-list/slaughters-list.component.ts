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
  searchLoopBack = new EventEmitter<Slaughter[]>();

  constructor(
    private slaughterService: SlaughterService
  ) { }

  ngOnInit(): void {
    this.refreshSlaughters();
  }

  private initSlaughters(slaughters: Slaughter[]) {
    return this.slaughters = slaughters;
  }

  refreshSlaughters(): void {
    this.searchLoopBack.subscribe((slaughters: Slaughter[]) => this.initSlaughters(slaughters));
    this.slaughterService.getSlaughters(this.searchLoopBack);
  }

  handleSlaughterCreation(slaughterCreated: Slaughter): void {
    this.refreshSlaughters();
  }
}
