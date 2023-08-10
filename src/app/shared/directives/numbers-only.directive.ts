import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const currentValue = inputElement.value;
    // Remove any non-numeric characters from the input value using a regular expression
    const sanitizedValue = currentValue.replace(/[^0-9]/g, '');
    // Update the input element value with the sanitized value
    if (currentValue !== sanitizedValue) {
      inputElement.value = sanitizedValue;
      // Emit the input event manually to trigger any other input-related logic
      event.preventDefault();
      event.stopPropagation();
      inputElement.dispatchEvent(new Event('input'));
    }
  }
}
