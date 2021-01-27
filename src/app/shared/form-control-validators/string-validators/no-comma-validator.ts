import { FormControl } from '@angular/forms';

export function noCommaValidator(control: FormControl) {
  let noComma = control.value.replace(',', '').length == control.value.length;

  return noComma ? null : { commaIsPresent: true };
}
