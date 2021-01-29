import { FormControl } from '@angular/forms';

// YYYY-MM-DD
export function inDateFormatYYYYdashMMdashDDDataInputMustHave10Characters(
  control: FormControl
) {
  let dateStringLength = control.value.length;

  return dateStringLength != 10 ? null : { dataInputNotHave10Characters: true };
}
