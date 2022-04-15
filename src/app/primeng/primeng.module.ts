import { NgModule } from '@angular/core';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  exports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    ProgressSpinnerModule,
  ],
})
export class PrimengModule {}
