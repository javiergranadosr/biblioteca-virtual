import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[error-msg]',
})
export class ErrorMsgDirective implements OnInit {
  private _message: string = 'Campo requerido';
  htmlElement: ElementRef<HTMLElement>;

  @Input() set message(message: string) {
    this._message = message;
  }

  @Input() set validate (value: boolean) {
    if (value) {
      this.htmlElement.nativeElement.classList.remove('hidden');
    } else {
      this.htmlElement.nativeElement.classList.add('hidden');
    }
  }

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = this.el;
  }

  ngOnInit(): void {
    this.setColor();
    this.setMessage();
  }

  setColor(): void {
    this.htmlElement.nativeElement.classList.add('error__message');
  }

  setMessage(): void {
    this.htmlElement.nativeElement.innerText = this._message;
  }
}
