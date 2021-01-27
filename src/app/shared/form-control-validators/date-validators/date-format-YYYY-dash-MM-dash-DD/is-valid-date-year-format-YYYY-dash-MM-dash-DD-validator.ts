import { FormControl } from '@angular/forms';

// yyyy-mm-dd
export function isValidDateYearFormatYYYdMMdDDValidator(control: FormControl) {
  let dateString = control.value;

  let dateStringLength = control.value.length;

  if (dateStringLength < 5) {
    return null;
  } else {
    let yearString = dateString.substring(0, 4);

    return /^\d{4}$/.test(yearString)
      ? null
      : { dateHasNotAValidYearFormatInYYYdMMdDD: true };
  }
}
