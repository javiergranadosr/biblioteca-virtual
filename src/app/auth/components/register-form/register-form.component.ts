import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '../../interfaces/httpResponse';
import { Register } from '../../interfaces/register';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  formRegister: FormGroup = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],
    surname: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^([\da-z\_\-\.]+)@([\da-z\-\_\.]+)\.([a-z\.]{2,6})$/
        ),
      ],
    ],
    username: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(50)],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(30)],
    ],
    confirmPassword: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(30)],
    ],
  });
  @ViewChild('confirmPass') confirmPassword:
    | ElementRef<HTMLElement>
    | undefined;
  loading: boolean = false;
  response: HttpResponse | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  hasErrorRequired(field: string): boolean {
    if (this.formRegister.get(field)?.getError('required')) {
      return true;
    }
    return false;
  }

  hasErrorFormat(field: string): boolean {
    if (
      this.formRegister.get(field)?.getError('minlength') ||
      this.formRegister.get(field)?.getError('maxlength')
    ) {
      return true;
    }
    return false;
  }

  hasErrorEmail(field: string): boolean {
    if (this.formRegister.get(field)?.getError('pattern')) {
      return true;
    }
    return false;
  }

  register() {
    if (this.formRegister.valid) {
      this.loading = true;
      const data: Register = this.formRegister.value;
      if (data.password.trim() !== data.confirmPassword.trim()) {
        this.confirmPassword?.nativeElement.classList.remove('hidden');
      } else {
        this.confirmPassword?.nativeElement.classList.add('hidden');
      }
      this.authService.register(data).subscribe((resp: HttpResponse) => {
        this.loading = false;
        this.response = resp;
        if (resp.error) {
          this.loading = false;
        } else {
          setTimeout(() => {
            this.router.navigateByUrl('');
          }, 3000);
          this.formRegister.reset();
        }
      });
    }
  }
}
