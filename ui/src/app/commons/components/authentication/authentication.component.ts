import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/commons/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  loginForm: FormGroup;
  renewPasswordForm: FormGroup;
  authenticationInfoMessage;
  destinationRoute: string;
  renewPasswordMode: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
    this.createLoginForm();
    this.createRenewPasswordForm();
  }

  ngOnInit(): void {
    this.destinationRoute = this.route.snapshot.paramMap.get('destinationRoute');
    this.renewPasswordMode = false;
  }

  createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }


  createRenewPasswordForm(): void {
    this.renewPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email ]],
    });
  }

  startPasswordRenewal(): void {
    this.renewPasswordMode = true;
  }

  cancelPasswordRenewal(): void {
    this.renewPasswordMode = false;
  }

  login(data: { email: string; password: string; }): void {
    this.authenticationService.getAuthenticationFromBackend(data.email, data.password).subscribe(
      () => {
        console.log('authentication successful !');
        this.authenticationInfoMessage = 'Bonjour !';
        this.router.navigate([this.destinationRoute]);
      },
      () => {
        console.error('authentication failed !');
        this.authenticationInfoMessage = 'email ou mot de passe invalide';
      }
    );
  }

  renewPassword(data: { email: string }): void {
    this.authenticationService.renewPassword(data.email, this.destinationRoute).subscribe(
      () => {
        console.log('password renewal successful !');
        this.authenticationInfoMessage = 'Un email vous a été envoyé à l\'adresse "' + data.email + '". Veuillez veuillez suivre les instructions indiquées pour vous connecter.';
        this.renewPasswordMode = false;
      },
      (error) => {
        if (error.status === 403) {
          this.authenticationInfoMessage = 'Veuillez vérifier l\'adresse mail : "' + data.email + '" ne correspond à aucun compte existant.';
        } else {
          this.authenticationInfoMessage = 'Oups... une erreur inattendue s\'est produite. Veuillez contacter le support.';
        }
      });
  }

}
