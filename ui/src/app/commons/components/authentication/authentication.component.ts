import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  loginForm: FormGroup;
  authenticationErrorMessage;
  destinationRoute: string;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
    this.createLoginForm();
  }

  ngOnInit(): void {
    this.destinationRoute = this.route.snapshot.paramMap.get('destinationRoute');
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
        this.router.navigate([this.destinationRoute]);
      },
      () => {
        console.error('authentication failed !');
        this.authenticationErrorMessage = 'email ou mot de passe invalide';
      }
    );
  }
}
