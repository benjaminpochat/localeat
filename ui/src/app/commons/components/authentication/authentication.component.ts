import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  loginForm: FormGroup;
  authenticationErrorMessage;
  @Input() destinationRoute: string;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.createLoginForm();
  }

  ngOnInit() {

  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

  login(data){
    this.authenticationService.getAuthenticationFromBackend(data.email, data.password).subscribe(
      () => {
        console.log('authentication successful !');
        this.authenticationErrorMessage = 'Bonjour !';
        // à tester...
        //this.router.navigate([this.destinationRoute]);
      },
      () => {
        console.error('authentication failed !');
        this.authenticationErrorMessage = 'email ou mot de passe invalide';
      }
    );
  }
}
