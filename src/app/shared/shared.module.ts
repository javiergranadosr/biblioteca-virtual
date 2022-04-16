import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { ErrorMsgDirective } from './directives/error-msg.directive';
import { LoadingComponent } from './loading/loading.component';
import { PrimengModule } from '../primeng/primeng.module';

@NgModule({
  declarations: [FooterComponent, ErrorMsgDirective, LoadingComponent],
  exports: [FooterComponent, LoadingComponent, ErrorMsgDirective],
  imports: [PrimengModule]
})
export class SharedModule {}
