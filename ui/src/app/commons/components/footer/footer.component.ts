import { Component, OnInit, ViewChild } from '@angular/core';
import { RulesComponent } from '../rules/rules.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @ViewChild(RulesComponent)
  private rulesComponent: RulesComponent;

  constructor() { }

  ngOnInit(): void {
  }

  showRulesComponent() {
    this.rulesComponent.displayed = true;
  }
}
