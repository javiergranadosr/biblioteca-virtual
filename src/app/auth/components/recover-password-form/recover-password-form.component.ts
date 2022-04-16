import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '../../interfaces/httpResponse';
import { RecoverPassword } from '../../interfaces/recoverPassword';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recover-password-form',
  templateUrl: './recover-password-form.component.html',
  styleUrls: ['./recover-password-form.component.css'],
})
export class RecoverPasswordFormComponent implements OnInit {
  formRecover: FormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^([\da-z\_\-\.]+)@([\da-z\-\_\.]+)\.([a-z\.]{2,6})$/
        ),
      ],
    ],
  });
  email: RecoverPassword | undefined;
  loading: boolean = false;
  response: HttpResponse | undefined;
  emailSuccess: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}

  hasErrorRequired(field: string): boolean {
    if (this.formRecover.get(field)?.getError('required')) {
      return true;
    }
    return false;
  }

  hasErrorEmail(field: string): boolean {
    if (this.formRecover.get(field)?.getError('pattern')) {
      return true;
    }
    return false;
  }

  recoverPassword() {
    this.emailSuccess = '';
    this.loading = true;
    if (this.formRecover.valid) {
      this.email = this.formRecover.value;
      this.authService
        .recoverPassword(this.email!)
        .subscribe((resp: HttpResponse) => {
          this.response = resp;
          this.loading = false;
          if (!this.response.error) {
            this.emailSuccess =
              'Se ha enviado su nueva contraseña a su correo electrónico.';
            this.formRecover.reset();
          }
        });
    }
  }
}
