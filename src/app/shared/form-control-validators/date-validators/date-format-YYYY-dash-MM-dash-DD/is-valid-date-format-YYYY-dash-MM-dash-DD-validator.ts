import { FormControl } from '@angular/forms';

// yyyy-mm-dd
export function isValidDateFormatYYYdMMdDDValidator(control: FormControl) {
  let dateString = control.value;
  let dateStringLength = control.value.length;

  if (dateStringLength < 10) {
    return null;
  } else {
    return /^\d{4}\-\d{1,2}\-\d{1,2}$/.test(dateString)
      ? null
      : { dateHasNotAValidFormatInYYYdMMdDD: true };
  }
}
