import { Component, OnInit, Inject, Output } from '@angular/core';
import { Authentication } from 'src/app/commons/models/authentication.model';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Actor } from 'src/app/commons/models/actor.model';
import { AccountService } from 'src/app/commons/services/account.service';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { OrderService } from '../../services/order.service';
import { Order } from 'src/app/commons/models/order.model';
import { OrderItem } from 'src/app/commons/models/order-item.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {

  order: Order;

  @Output()
  createOrderEvent = new EventEmitter<Order>();
  authentication: Authentication;
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
    private authenticationService: AuthenticationService,
    private userService: AccountService,
    private orderService: OrderService,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initLabels();
    this.initAuthentication();
    this.initOrderForms();
  }

  public initOrder(delivery: Delivery) {
    this.order = new Order();
    this.order.orderedItems = delivery.availableBatches.map(batch => {
      const orderItem = new OrderItem();
      orderItem.batch = batch;
      orderItem.unitPrice = batch.product.unitPrice;
      orderItem.quantity = 0;
      return orderItem;
    });
    this.order.delivery = delivery;
  }

  private initLabels() {
    this.productSelectionStepLabel = 'Sélectionnez la quantité de viande commandée (en kg)';
    this.productSelectionButtonLabel = 'Je valide la quantité';
    this.paymentStepLabel = 'Procédez au paiement';
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
    this.productSelectionForm = this.formBuilder.group({});
    this.paymentForm = this.formBuilder.group({
      payed: [false, Validators.requiredTrue]
    });
  }

  updateOrderItems(): void {
    console.log(this.order.orderedItems);
    const totalPrice = this.order.orderedItems
      .map(orderItem => orderItem.batch.product.unitPrice * orderItem.batch.product.netWeight * orderItem.quantity)
      .reduce( (total, itemPrice) => total + itemPrice );
    this.productSelectionButtonLabel = 'Je valide ma commande pour ' + totalPrice + ' €TTC';
  }

  isOrderEmpty(): boolean {
    return this.order.orderedItems.filter((item) => item.quantity > 0).length > 0;
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

  isOrderNotEmpty(){
    return this.order.orderedItems.length > 0;
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
    this.order.orderedItems = this.order.orderedItems.filter(orderedItem => orderedItem.quantity > 0);
    this.orderService.saveOrder(this.order).subscribe((order: Order) => {
      this.paymentStepLabel = 'C\'est payé';
      this.orderStored = true;
      this.createOrderEvent.emit(this.order);
    });
  }

  close(){
    this.order = null;
  }
}
