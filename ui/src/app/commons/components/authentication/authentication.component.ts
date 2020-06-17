import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  loginForm: FormGroup;
  authenticationErrorMessage;
  //registerForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder) {
    this.createLoginForm();
    //this.createRegisterForm();
  }

  ngOnInit() {

  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

  // createRegisterForm(){
  //   this.registerForm = this.formBuilder.group({
  //     username: ['', Validators.required ],
  //     password: ['', Validators.required ]
  //   });
  // }

  login(data){
    this.authenticationService.getAuthenticationFromBackend(data.email, data.password).subscribe(
      () => {
        console.log('authentication successful !');
        this.authenticationErrorMessage = 'Bonjour !';
      },
      () => {
        console.error('authentication failed !');
        this.authenticationErrorMessage = 'email ou mot de passe invalide';
      }
    );
  }

  // addAccounts(data){
  //   this.test = data.accessKey;
  // }

  // toggleForm(){
  //   this.registerToggle = (this.registerToggle === false) ? true : false;
  //   this.loginForm.reset();
  //   this.registerForm.reset();
  // }
}
