import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit {

  displayed = false;

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.displayed = false;
  }

}
