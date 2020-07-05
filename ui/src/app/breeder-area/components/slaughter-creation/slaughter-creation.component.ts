import { Component, OnInit } from '@angular/core';
import { SlaughterService } from '../../services/slaughter.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Slaughter } from 'src/app/commons/models/slaughter.model';

@Component({
  selector: 'app-slaughter-creation',
  templateUrl: './slaughter-creation.component.html',
  styleUrls: ['./slaughter-creation.component.css']
})
export class SlaughterCreationComponent implements OnInit {

  slaughterForm: FormGroup;
  slaughter: Slaughter;

  constructor(
    private slaughterService: SlaughterService,
    private formBuilder: FormBuilder) {
    this.createSlaughterForm();
    this.slaughter = new Slaughter();
  }

  ngOnInit(): void {
  }


  createSlaughterForm() {
    this.slaughterForm = this.formBuilder.group({
      slaughterDate: ['', Validators.required ],
      liveWeight: ['', Validators.required]
    });
  }

  saveSlaughter(data): void {
    const slaughter = new Slaughter();
    slaughter.slaughterDate = data.date;
    this.slaughterService.createSlaughter(slaughter);
  }

  hideSlaughterForm(): void {
    //this.slaughterFormShown = false;
  }
}
