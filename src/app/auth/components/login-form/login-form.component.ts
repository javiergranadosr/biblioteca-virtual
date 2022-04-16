import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '../../interfaces/httpResponse';
import { Login } from '../../interfaces/login';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  formLogin: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  response: HttpResponse | undefined;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}

  hasErrorRequired(field: string): boolean {
    if (this.formLogin.get(field)?.getError('required')) {
      return true;
    }
    return false;
  }

  login(): void {
    this.loading = true;
    if (this.formLogin.valid) {
      const data: Login = this.formLogin.value;
      this.authService.login(data).subscribe((resp: HttpResponse) => {
        this.response = resp;
        this.loading = false;
        if (this.response.code === 200) {
          this.formLogin.reset();
          // TODO: Redireccionar a ruta principal de la biblioteca
        }
        if (this.response.error) {
          this.loading = false;
          this.response!.error =
            'La contraseña o nombre de usuario son incorrectos.';
          console.log(this.response);
        }
      });
    }
  }
}
