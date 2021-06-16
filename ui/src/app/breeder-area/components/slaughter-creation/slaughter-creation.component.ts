import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SlaughterService } from 'src/app/breeder-area/services/slaughter.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Slaughter } from 'src/app/commons/models/slaughter.model';
import { MatSliderChange } from '@angular/material/slider';
import { AnimalBreed, AnimalBreedUtils } from 'src/app/commons/models/animal-breed.model';
import { MatRadioChange } from '@angular/material/radio';
import { AnimalType, AnimalTypeUtils } from 'src/app/commons/models/animal-type.model';

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
      identificationNumber: new FormControl(null, Validators.required),
      animalType: new FormControl(null, Validators.required),
      breed: new FormControl(null, Validators.required),
      liveWeight: new FormControl(0, Validators.min(100)),
      slaughterDate: new FormControl(null, Validators.required),
      cuttingDate: new FormControl(null, Validators.required),
    });
  }

  setAnimalType(radioChange: MatRadioChange): void {
    this.slaughterForm.patchValue({animalType: radioChange.value});
  }

  setLiveWeight(sliderChange: MatSliderChange): void {
    this.slaughterForm.patchValue({liveWeight: sliderChange.value });
  }

  save(): void {
    if (this.slaughterForm.valid) {
      this.slaughter.animal.identificationNumber = this.slaughterForm.value.identificationNumber;
      this.slaughter.animal.animalType = this.slaughterForm.value.animalType;
      this.slaughter.animal.breed = this.slaughterForm.value.breed;
      this.slaughter.animal.liveWeight = this.slaughterForm.value.liveWeight;
      //source rendement moyen : https://www.la-viande.fr/economie-metiers/economie/chiffres-cles-viande-bovine/rendement-type-vache-allaitante
      this.slaughter.animal.meatWeight = this.slaughterForm.value.liveWeight * 0.36;
      this.slaughter.slaughterDate = this.slaughterForm.value.slaughterDate;
      this.slaughter.cuttingDate = this.slaughterForm.value.cuttingDate;
      this.slaughterService.saveSlaughter(this.slaughter).subscribe(slaughter => {
      this.createSlaughterEvent.emit(slaughter);
      this.resetComponenent();
      });
    } else {
      this.userAlert = 'Veuillez vérifier les informations saisies.';
    }
  }

  getAnimalBreeds(): string[] {
    return Object.keys(AnimalBreed).map(key => AnimalBreed[key]);
  }

  getAnimalBreedLabel(breed: AnimalBreed) {
    return AnimalBreedUtils.getAnimalBreedLabel(breed);
  }

  getAnimalTypes(): string[] {
    return Object.keys(AnimalType).map(key => AnimalType[key]);
  }

  getAnimalTypeLabel(animalType: AnimalType) {
    return AnimalTypeUtils.getAnimalTypeLabel(animalType);
  }

  cancel(): void {
    this.resetComponenent();
  }

  private resetComponenent() {
    this.slaughter = null;
    this.slaughterForm.reset();
  }
}
