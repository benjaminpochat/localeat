import { Component, OnInit } from '@angular/core';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { SlaughterService } from '../../services/slaughter.service';

@Component({
  selector: 'app-slaughters-list',
  templateUrl: './slaughters-list.component.html',
  styleUrls: ['./slaughters-list.component.css']
})
export class SlaughtersListComponent implements OnInit {

  slaughters: Slaughter[];

  constructor(
    private slaughterService: SlaughterService
  ) { }

  ngOnInit(): void {
    this.slaughters = this.slaughterService.getSlaughters();
  }

}
