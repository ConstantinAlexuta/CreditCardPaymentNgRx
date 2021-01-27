import { FormControl } from '@angular/forms';

export function onlyDigitsValidator(control: FormControl) {
  let isNumber =
    control.value != null &&
    control.value !== '' &&
    !isNaN(Number(control.value.toString()));

  let noDotOrComma =
    control.value.replace('.', '').replace(',', '').length ==
    control.value.length;

  return isNumber && noDotOrComma ? null : { areNotOnlyDigits: true };
}
