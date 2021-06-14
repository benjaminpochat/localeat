import { OnInit, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-piechart',
  template: `
  <style>
    .pie-chart {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  </style>
  <div class="pie-chart" #piechart></div>
  `
})
export class PieChartComponent {

  @Input()
  backgroundImage: string;

  radius = 25;

  @ViewChild('piechart')
  pieChart;

  public setRadius(radius){
    this.pieChart.nativeElement.style.setProperty('background-image', 'conic-gradient(darkolivegreen ' + radius.toString() + 'deg , lightgrey ' + radius.toString() + 'deg 360deg)');
  }
}
