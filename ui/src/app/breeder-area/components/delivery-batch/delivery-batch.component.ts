import { Component, Input, OnInit } from '@angular/core';
import { Batch } from 'src/app/commons/models/batch.model';

@Component({
  selector: 'app-delivery-batch',
  templateUrl: './delivery-batch.component.html',
  styleUrls: ['./delivery-batch.component.css']
})
export class DeliveryBatchComponent implements OnInit {

  @Input()
  batch: Batch;

  constructor() { }

  ngOnInit(): void {
  }

}
