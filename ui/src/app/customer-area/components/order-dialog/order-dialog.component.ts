import { Component, OnInit } from '@angular/core';
import { Authentication } from 'src/app/commons/models/authentication.model';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';
import { MatRadioChange } from '@angular/material/radio';
import { Actor } from 'src/app/commons/models/actor.model';
import { Account } from 'src/app/commons/models/account.model';
import { AccountService } from 'src/app/commons/services/account.service';

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
  accountCreationFailureMessage: string;
  authenticationSubmitted = false;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: AccountService,
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
      const userFirstName = this.authentication.account.actor.firstName;
      this.authenticationStepLabel = 'Votre commande est au nom de ' + userFirstName + ' ' + userName;
    } else {
      this.authenticationStepLabel = 'Identifiez-vous';
    }
  }

  private initOrderForms() {
    this.authenticationForm = this.formBuilder.group({
      existingEmail: ['', [Validators.required, Validators.email]],
      existingPassword: ['', Validators.required],
      creatingName: ['', Validators.required],
      creatingFirstName: ['', Validators.required],
      creatingEmail: ['', [Validators.required, Validators.email]],
      creatingPhone: ['', Validators.required],
      creatingPassword: ['', [Validators.required, Validators.minLength(6)]],
      creatingPasswordConfirmed: ['', Validators.required]
    }, {validators: this.passwordConfirmedValidator});
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

  login(email: string, password: string): void {
    this.authenticationService.getAuthenticationFromBackend(email, password).subscribe(
        () => {
          console.log('authentication successful !');
          this.initAuthentication();
          this.resetAuthenticationStepLabel();
        },
        () => {
          console.error('authentication failed !');
          this.authenticationFailureMessage = 'Connexion impossible avec l\'identifiant et le mot de passe saisi.';
        }
      );
  }

  logout(): void {
    this.authenticationForm.reset();
    this.authenticationService.deleteAuthentication();
    this.authentication = undefined;
  }

  createCustomerAccount(): void {
    this.authenticationSubmitted = true;
    const actor = new Actor();
    actor.firstName = this.authenticationForm.value.creatingFirstName;
    actor.name = this.authenticationForm.value.creatingName;
    actor.email = this.authenticationForm.value.creatingEmail;
    actor.phoneNumber = this.authenticationForm.value.creatingPhone;
    actor['@type'] = 'Customer';
    const password = this.authenticationForm.value.creatingPassword;
    this.userService.createCustomerAccount(actor, password).subscribe(
      () => {
        console.log('Account created');
        this.login(actor.email, password);
      },
      (error) => {
        if (error.status === 409){
          this.accountCreationFailureMessage = 'Un compte existe déjà avec l\'adresse mail ' + actor.email + '.';
        } else {
          this.accountCreationFailureMessage = 'Impossible de créer un compte avec ces informations.';
        }
        console.error('account creation failed !');
      }
    );
  }

  passwordConfirmedValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    const creatingPasswordField = formGroup.get('creatingPassword');
    const creatingPasswordConfirmedField = formGroup.get('creatingPasswordConfirmed');
    return creatingPasswordField.value === creatingPasswordConfirmedField.value ? null : { passwordConfirmationFailed: true };
  }

  isErrorMessageDisplayed(formFieldName: string, formControlKey: string, checkWhenTouched = false): boolean {
    const formField = this.authenticationForm.get(formFieldName);
    return formField.hasError(formControlKey)
      && checkWhenTouched
      && formField.touched;
  }

  areFormFieldsValid(formFieldNames: string[]){
    let result = this.authenticationForm.errors === null;
    formFieldNames.forEach((fieldName) => {
      const formField = this.authenticationForm.get(fieldName);
      result = result && (formField.errors === null);
    });
    return result;
  }

}
