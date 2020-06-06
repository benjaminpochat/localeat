import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailControl: FormControl;
  passwordControl: FormControl;

  constructor(private loginService: LoginService) {
    this.emailControl = new FormControl('');
    this.passwordControl = new FormControl('');
  }

  login() {
    this.loginService.login(this.emailControl.value, this.passwordControl.value);
  }

  test() {
    this.loginService.test();
  }
}
/*
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router) {

      this.form = this.fb.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  ngOnInit(): void {
  }

  login() {
      const val = this.form.value;

      if (val.email && val.password) {
          this.loginService.login(val.email, val.password)
              .subscribe(
                  () => {
                      console.log("User is logged in");
                      this.router.navigateByUrl('/');
                  }
              );
      }
  }
}
*/
