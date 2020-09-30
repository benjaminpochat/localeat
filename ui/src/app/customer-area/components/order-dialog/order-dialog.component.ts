import { Component, OnInit, Inject } from '@angular/core';
import { Authentication } from 'src/app/commons/models/authentication.model';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';
import { MatRadioChange } from '@angular/material/radio';
import { Actor } from 'src/app/commons/models/actor.model';
import { AccountService } from 'src/app/commons/services/account.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { Product } from 'src/app/commons/models/product.model';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {
  authentication: Authentication;
  orderedProduct: Product;
  productSelectionForm: FormGroup;
  authenticationForm: FormGroup;
  paymentForm: FormGroup;
  existingAccount = true;
  orderStored = false;
  productSelectionStepLabel: string;
  authenticationStepLabel: string;
  paymentStepLabel: string;
  productSelectionButtonLabel: string;
  authenticationFailureMessage: string;
  accountCreationFailureMessage: string;
  authenticationSubmitted = false;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public delivery: Delivery,
    private authenticationService: AuthenticationService,
    private userService: AccountService,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.orderedProduct = this.delivery.availableProducts[0];
    this.productSelectionStepLabel = 'Sélectionnez la quantité de viande commandée (en kg)';
    this.productSelectionButtonLabel = 'Je valide la quantité (5kg min)';
    this.paymentStepLabel = 'Procédez au paiement';
    this.initAuthentication();
    this.initOrderForms();
  }

  setQuantity(sliderChange: MatSliderChange): void{
    this.productSelectionForm.patchValue({quantity: sliderChange.value });
    const totalPrice = this.productSelectionForm.value.quantity * this.orderedProduct.price;
    this.productSelectionStepLabel = this.productSelectionForm.value.quantity + 'kg de viande pour ' + totalPrice + '€';
    this.productSelectionButtonLabel = 'Je commande ' + this.productSelectionForm.value.quantity + 'kg pour ' + totalPrice + '€';
  }

  private initAuthentication() {
    this.authenticationService.currentAuthentication.subscribe(authentication => {
      this.authentication = authentication;
      this.resetAuthenticationStepLabel();
    });
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
      payed: [false, Validators.requiredTrue]
    });
  }

  changeAuthentificationType(event: MatRadioChange){
    this.existingAccount = event.value === 'true';
  }

  login(email: string, password: string): void {
    this.authenticationService.getAuthenticationFromBackend(email, password).subscribe(
        () => {
          console.log('authentication successful !');
          this.initAuthentication();

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

  areFormFieldsValid(formGroup: FormGroup, formFieldNames: string[]){
    let result = formGroup.errors === null;
    formFieldNames.forEach((fieldName) => {
      const formField = formGroup.get(fieldName);
      result = result && (formField.errors === null);
    });
    return result;
  }

  pay(){
    //TODO : remplacer ça par un vrai paiement
    this.paymentForm.patchValue({payed : true});
    //TODO : enregistrer la commande
    this.paymentStepLabel = 'C\'est payé';
    this.orderStored = true;
  }

}
