import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { ErrorMsgDirective } from './directives/error-msg.directive';

@NgModule({
  declarations: [FooterComponent, ErrorMsgDirective],
  exports: [FooterComponent, ErrorMsgDirective],
})
export class SharedModule {}
