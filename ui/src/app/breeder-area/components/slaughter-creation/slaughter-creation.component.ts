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
  userAlert: string;
  @Output()
  createSlaughterEvent = new EventEmitter<Slaughter>();

  constructor(
    private slaughterService: SlaughterService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createSlaughterForm();
  }

  createSlaughterForm(): void {
    this.slaughterForm = this.formBuilder.group({
      slaughterDate: new FormControl(null, Validators.required),
      cuttingDate: new FormControl(null, Validators.required),
      liveWeight: new FormControl(0, Validators.min(100)),
    });
  }

  setLiveWeight(sliderChange: MatSliderChange): void{
    console.log('live weight = ' + sliderChange.value);
    this.slaughterForm.patchValue({liveWeight: sliderChange.value });
  }


  save(): void {
    if (this.slaughterForm.valid) {
      this.slaughter.slaughterDate = this.slaughterForm.value.slaughterDate;
      this.slaughter.cuttingDate = this.slaughterForm.value.cuttingDate;
      this.slaughter.animal.liveWeight = this.slaughterForm.value.liveWeight;
      //source rendement moyen : https://www.la-viande.fr/economie-metiers/economie/chiffres-cles-viande-bovine/rendement-type-vache-allaitante
      this.slaughter.animal.meatWeight = this.slaughterForm.value.liveWeight * 0.36;
      this.slaughterService.saveSlaughter(this.slaughter).subscribe(slaughter => {
        this.createSlaughterEvent.emit(slaughter);
        this.resetComponenent();
      });
    } else {
      this.userAlert = 'Veuillez vérifier les informations saisies.';
    }
  }

  cancel(): void {
    this.resetComponenent();
  }

  private resetComponenent() {
    this.slaughter = null;
    this.slaughterForm.reset();
  }
}
