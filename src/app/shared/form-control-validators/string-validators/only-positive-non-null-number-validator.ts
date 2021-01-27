import { FormControl } from '@angular/forms';

export function onlyPositiveNonNullNumberValidator(control: FormControl) {
  let isNumber =
    control.value != null &&
    control.value !== '' &&
    !isNaN(Number(control.value.toString()));

  return isNumber && Number(control.value.toString()) > 0
    ? null
    : { isNotAPositiveNonNullNumber: true };
}
