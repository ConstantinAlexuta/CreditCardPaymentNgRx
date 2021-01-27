import { FormControl } from '@angular/forms';

export function onlyNumberValidator(control: FormControl) {
  let isNumber =
    control.value != null &&
    control.value !== '' &&
    !isNaN(Number(control.value.toString()));

  return isNumber ? null : { isNotNumber: true };
}
