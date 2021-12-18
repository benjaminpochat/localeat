import { Component, OnInit, Inject, Output } from '@angular/core';
import { Authentication } from 'src/app/commons/models/authentication.model';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Actor } from 'src/app/commons/models/actor.model';
import { AccountService } from 'src/app/commons/services/account.service';
import { Delivery } from 'src/app/commons/models/delivery.model';
import { OrderService } from 'src/app/customer-area/services/order.service';
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
  confirmationForm: FormGroup;
  paymentForm: FormGroup;

  productSelectionStepLabel: string;
  authenticationStepLabel: string;
  confirmationStepLabel: string;
  paymentStepLabel: string;
  productSelectionButtonLabel: string;
  confirmationButtonLabel: string;
  paymentButtonLabel: string;

  authenticationFailureMessage: string;
  accountCreationFailureMessage: string;

  existingAccount = true;
  understood = false;
  orderStored = false;
  orderPayed = false;
  authenticationSubmitted = false;

  orderUnderProcess = false;
  accountCreationUnderProcess = false;
  paymentUnderProcess = false;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: AccountService,
    private orderService: OrderService,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initLabels();
    this.initAuthentication();
    this.initOrderForms();
    this.orderStored = false;
  }

  public initOrder(delivery: Delivery) {
    this.order = new Order();
    this.order.orderedItems = delivery.availableBatches
      .map(batch => {
        const orderItem = new OrderItem();
        orderItem.batch = batch;
        orderItem.unitPrice = batch.product.unitPrice;
        orderItem.quantity = 0;
        return orderItem;
      });
    this.order.delivery = delivery;
  }

  private initLabels() {
    this.productSelectionStepLabel = 'Sélectionnez les produits commandés';
    this.productSelectionButtonLabel = 'Je valide la quantité';
    this.confirmationStepLabel = 'Acceptez les conditions';
    this.confirmationButtonLabel = 'J\'accepte les conditions';
    this.paymentStepLabel = 'Payez votre commande';
    this.paymentButtonLabel = 'Je paie ma commande';
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
      creatingPhone: ['', [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]],
      creatingPassword: ['', [Validators.required, Validators.minLength(6)]],
      creatingPasswordConfirmed: ['', Validators.required]
    }, {validators: this.passwordConfirmedValidator});
    this.productSelectionForm = this.formBuilder.group({});
    this.confirmationForm = this.formBuilder.group({
      confirmed: [false, Validators.requiredTrue]
    });
    this.paymentForm = this.formBuilder.group({});
  }

  updateOrderItems(): void {
    console.log(this.order.orderedItems);
    const totalPrice = this.order.orderedItems
      .map(orderItem => orderItem.batch.product.unitPrice * orderItem.batch.product.netWeight * orderItem.quantity)
      .reduce( (total, itemPrice) => total + itemPrice );
    this.productSelectionButtonLabel = 'Je valide ma commande pour ' + totalPrice + ' € TTC';
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
        this.accountCreationUnderProcess = false;
        this.login(actor.email, password);
      },
      (error) => {
        if (error.status === 409){
          this.accountCreationFailureMessage = 'Un compte existe déjà avec l\'adresse mail ' + actor.email + '.';
        } else {
          this.accountCreationFailureMessage = 'Impossible de créer un compte avec ces informations.';
        }
        this.accountCreationUnderProcess = false;
        console.error('account creation failed !');
      }
    );
    this.accountCreationUnderProcess = true;
  }

  passwordConfirmedValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    if (this.existingAccount) {
      return null;
    }
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

  isOrderNotEmpty(): boolean {
    return this.order.orderedItems.length > 0;
  }

  areFormFieldsValid(formGroup: FormGroup, formFieldNames: string[]): boolean{
    let result = formGroup.errors === null;
    formFieldNames.forEach((fieldName) => {
      const formField = formGroup.get(fieldName);
      result = result && (formField.errors === null);
    });
    return result;
  }

  setUnderstood(understood: boolean ): void{
    this.understood = understood;
  }

  confirmOrder(): void {
    this.confirmationForm.patchValue({payed : true});
    this.order.orderedItems = this.order.orderedItems.filter(orderedItem => orderedItem.quantity > 0);
    this.orderService.saveOrder(this.order).subscribe((order: Order) => {
      this.order = order;
      this.confirmationStepLabel = 'Les conditions sont acceptées';
      this.orderStored = true;
      this.orderUnderProcess = false;
      this.confirmationButtonLabel = 'Il n\'y a plus qu\'à payer';
      // TODO : Déplacer ça à la confirmation du payment
      this.createOrderEvent.emit(this.order);
    });
    this.orderUnderProcess = true;
    this.confirmationButtonLabel = 'Traitement en cours...';
  }

  payOrder(): void {
    this.orderService.startPayment(this.order).subscribe(payment => {
      window.location.replace(payment.paymentUrl);
      this.paymentUnderProcess = false;
    }, error => {
      this.paymentUnderProcess = false;
    });
    this.paymentUnderProcess = true;
  }

  close(): void {
    this.resetComponentProperties();
  }

  private resetComponentProperties(): void {
    this.order = null;
    this.orderStored = false;
    this.orderPayed = false;
    this.orderUnderProcess = false;
    this.existingAccount = true;
    this.authenticationSubmitted = false;
    this.understood = false;
  }

  getAddress(): string {
    const address = this.order.delivery.deliveryAddress;
    return "à l'adresse suivante :<br>" + 
    [address.name,
      address.addressLine1,
      address.addressLine2,
      address.addressLine3,
      address.addressLine4,
      address.zipCode,
      address.city]
      .filter(addressElement => addressElement)
      .map(addressElement => `<div>${addressElement}</div>`)
      .join('')
  }
}
