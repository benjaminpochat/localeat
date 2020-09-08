import { Component, OnInit } from '@angular/core';
import { Authentication } from 'src/app/commons/models/authentication.model';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';
import { MatRadioChange } from '@angular/material/radio';
import { Actor } from 'src/app/commons/models/actor.model';
import { Account } from 'src/app/commons/models/account.model';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {
  authentication: Authentication;
  authenticationForm: FormGroup;
  productSelectionForm: FormGroup;
  paymentForm: FormGroup;
  existingAccount = true;
  orderStored = false;
  authenticationStepLabel: string;
  authenticationFailureMessage: string;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initAuthentication();
    this.resetAuthenticationStepLabel();
    this.initOrderForms();
  }

  private initAuthentication() {
    this.authenticationService.currentAuthentication.subscribe(authentication => this.authentication = authentication);
  }

  private resetAuthenticationStepLabel() {
    if (this.authentication) {
      const userName = this.authentication.account.actor.name;
      const userFirst = this.authentication.account.actor.firstName;
      this.authenticationStepLabel = 'Votre commande est au nom de ' + userFirst + ' ' + userName;
    } else {
      this.authenticationStepLabel = 'Identifiez-vous';
    }
  }

  private initOrderForms() {
    this.authenticationForm = this.formBuilder.group({
      existingEmail: ['', Validators.required],
      existingPassword: ['', Validators.required],
      creatingName: ['', Validators.required],
      creatingFirstName: ['', Validators.required],
      creatingEmail: ['', Validators.required],
      creatingPhone: ['', Validators.required],
      creatingPassword: ['', Validators.required],
      creatingPasswordConfirmed: ['', Validators.required]
    });
    this.productSelectionForm = this.formBuilder.group({
      quantity: [0, Validators.min(5)]
    });
    this.paymentForm = this.formBuilder.group({
      payed: [false]
    });
  }

  changeAuthentificationType(event: MatRadioChange){
    this.existingAccount = event.value === 'true';
  }

  setQuantity(sliderChange: MatSliderChange): void{
    this.productSelectionForm.patchValue({quantity: sliderChange.value });
  }

  login(): void {
    this.authenticationService.getAuthenticationFromBackend(
      this.authenticationForm.value.existingEmail,
      this.authenticationForm.value.existingPassword).subscribe(
        () => {
          console.log('authentication successful !');
          this.initAuthentication();
          this.resetAuthenticationStepLabel();
        },
        () => {
          console.error('authentication failed !');
          this.authenticationFailureMessage = "Connexion impossible avec l'identifiant et le mot de passe saisi.";
        }
    );
  }

  logout(): void {
    this.authenticationService.deleteAuthentication();
    this.authentication = undefined;
  }

  createNewAccount(): void {
    const actor = new Actor();
    actor.firstName = this.authenticationForm.value.creatingFirstName;
    actor.name = this.authenticationForm.value.creatingName;
    actor.email = this.authenticationForm.value.creatingEmail;
    actor.phoneNumber = this.authenticationForm.value.creatingPhone;
    const account = new Account();
    account.actor = actor;
    //TODO : appel REST pour la création du compte, du user, et du mot de passe.
  }

}
