import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/commons/services/account.service';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';

@Component({
  selector: 'app-password-renewal',
  templateUrl: './password-renewal.component.html',
  styleUrls: ['./password-renewal.component.css']
})
export class PasswordRenewalComponent implements OnInit {

  destinationRoute: string;
  token: string;
  authenticationSuccess: boolean;
  infoMessage: string;
  renewPasswordForm: FormGroup;
  passwordChangeSuccessful: boolean;
  passwordChangeFailed : boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService) {
    this.createRenewPasswordForm();
  }

  ngOnInit(): void {
    this.destinationRoute = this.route.snapshot.queryParamMap.get('destinationRoute');
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.passwordChangeSuccessful = false;
    this.passwordChangeFailed = false;
    try {
      this.authenticationService.refreshAuthenticationFromBackend(this.token).subscribe(
        () => {
          this.authenticationSuccess = true;
        },
        (error) => {
          this.authenticationSuccess = false;
        });
    } catch (error) {
      console.error(error);
      this.authenticationSuccess = false;
    }
  }

  createRenewPasswordForm(): void {
    this.renewPasswordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPasswordConfirmed: ['', [Validators.required]],
    }, {validators: this.passwordConfirmedValidator});
  }

  passwordConfirmedValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    const creatingPasswordField = formGroup.get('newPassword');
    const creatingPasswordConfirmedField = formGroup.get('newPasswordConfirmed');
    return creatingPasswordField.value === creatingPasswordConfirmedField.value ? null : { passwordConfirmationFailed: true };
  }

  saveNewPassword(data: { newPassword: string }): void {
    this.accountService.saveNewPassword(data.newPassword).subscribe(
      () => {
        this.passwordChangeSuccessful = true;
      },
      () => {
        this.passwordChangeFailed = true;
      }
    );
  }

  accessSite(): void {
    this.router.navigate([this.destinationRoute]);
  }

}
