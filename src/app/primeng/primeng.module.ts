import { NgModule } from '@angular/core';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

@NgModule({
  exports: [CardModule, InputTextModule, ButtonModule, PasswordModule],
})
export class PrimengModule {}
