import { FormControl } from '@angular/forms';

// YYYY-MM-DD
export function inDateFormatYYYYdashMMdashDDAfterYearMustBeADash(
  control: FormControl
) {
  let dateString = control.value;

  let dateStringLength = control.value.length;

  return dateStringLength < 5 ||
    (dateStringLength >= 5 && dateString.substring(4, 5) == '-')
    ? null
    : { afterYearMustBeADash: true };
}
