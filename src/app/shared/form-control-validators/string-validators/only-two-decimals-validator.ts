import { FormControl } from '@angular/forms';

export function onlyTwoDecimalsValidator(control: FormControl) {
  let numberOfDecimals = 0;

  let haveDot = control.value.replace('.', '').length != control.value.length;

  let indexOfDot = (control.value + '').indexOf('.', 0);

  if (indexOfDot > 0) {
    numberOfDecimals = control.value.length - indexOfDot - 1;
  }

  return !(haveDot && indexOfDot >= 1 && numberOfDecimals > 2)
    ? null
    : { moreThanTwoDecimals: true };
}
