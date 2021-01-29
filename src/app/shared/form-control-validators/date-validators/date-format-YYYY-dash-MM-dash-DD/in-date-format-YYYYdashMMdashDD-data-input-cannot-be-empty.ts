import { FormControl } from '@angular/forms';

// YYYY-MM-DD
export function inDateFormatYYYYdashMMdashDDdataInputCannotBeEmpty(
  control: FormControl
) {
  let dateStringLength = control.value.length;

  return dateStringLength > 0 ? null : { dataInputCannotBeEmpty: true };
}
