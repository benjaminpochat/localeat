import { Component, OnInit } from '@angular/core';
import { SlaughterService } from '../../services/slaughter.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { MatSliderChange } from '@angular/material/slider';

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

  saveSlaughter(slaughterFormValue): void {
    this.slaughter.cuttingDate = slaughterFormValue.slaughterDate;
    this.slaughterService.createSlaughter(this.slaughter);
  }

  createSlaughterForm() {
    this.slaughterForm = this.formBuilder.group({
      slaughterDate: new FormControl(null, Validators.required),
      liveWeight: new FormControl(0, Validators.required)
    });
  }

  setLiveWeight(sliderChange: MatSliderChange){
    console.log('live weight = ' + sliderChange.value);
    this.slaughterForm.patchValue({liveWeight: sliderChange.value });
  }
}
