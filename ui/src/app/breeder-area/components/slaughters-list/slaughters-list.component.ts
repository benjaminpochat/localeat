import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { SlaughterService } from '../../services/slaughter.service';
import { SalePublicationComponent } from '../sale-publication/sale-publication.component';

@Component({
  selector: 'app-slaughters-list',
  templateUrl: './slaughters-list.component.html',
  styleUrls: ['./slaughters-list.component.css']
})
export class SlaughtersListComponent implements OnInit {

  slaughters: Slaughter[];
  slaughterSelectedForSalePublication: Slaughter;
  searchLoopBack = new EventEmitter<Slaughter[]>();

  @Output()
  salePublicationLoopBack = new EventEmitter<Slaughter>();

  constructor(
    private slaughterService: SlaughterService
  ) { }

  ngOnInit(): void {
    this.refreshSlaughters();
  }

  refreshSlaughters(): void {
    this.searchLoopBack.subscribe((slaughters: Slaughter[]) => this.slaughters = slaughters);
    this.slaughterService.getSlaughters(this.searchLoopBack);
  }

  handleSlaughterCreation(slaughterCreated: Slaughter): void {
    this.refreshSlaughters();
  }

  showSalePublication(slaughter: Slaughter){
    this.slaughterSelectedForSalePublication = slaughter;
  }

  salePublicationShown(slaughter: Slaughter): boolean {
    return this.slaughterSelectedForSalePublication === slaughter;
  }

  hideSalePublication(){
    this.slaughterSelectedForSalePublication = undefined;
  }

  handleSalePublication(slaughter: Slaughter){
    this.hideSalePublication();
    this.salePublicationLoopBack.emit(slaughter);
    //TODO : afficher un message d'info pour confirmer la création (slaughter !== undefined) ou l'annulation (slaughter === undefined)
  }

}
