import { Component, OnInit, EventEmitter, Output } from '@angular/core';
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
  userMessage: string;
  @Output() creationLoopBack = new EventEmitter<Slaughter>();

  constructor(
    private slaughterService: SlaughterService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createSlaughterForm();
    this.slaughter = new Slaughter();
  }

  saveSlaughter(): void {
    if (this.slaughterForm.valid) {
      this.slaughter.slaughterDate = this.slaughterForm.value.slaughterDate;
      this.slaughter.cuttingDate = this.slaughterForm.value.cuttingDate;
      this.slaughter.animal.liveWeight = this.slaughterForm.value.liveWeight;
      this.slaughterService.createSlaughter(this.slaughter, this.creationLoopBack);
    } else {
      this.userMessage = 'Veuillez vérifier les informations saisies.';
    }
  }

  createSlaughterForm() {
    this.slaughterForm = this.formBuilder.group({
      slaughterDate: new FormControl(null, Validators.required),
      cuttingDate: new FormControl(null, Validators.required),
      liveWeight: new FormControl(0, Validators.min(100)),
    });
  }

  setLiveWeight(sliderChange: MatSliderChange){
    console.log('live weight = ' + sliderChange.value);
    this.slaughterForm.patchValue({liveWeight: sliderChange.value });
  }
}
