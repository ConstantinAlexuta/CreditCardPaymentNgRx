import { FormControl } from '@angular/forms';

export function startWithCharacterValidator(control: FormControl) {
  let firstChar = control.value.charAt(0);
  let firstCharIsDigit =
    firstChar != null &&
    firstChar !== '' &&
    firstChar !== ' ' &&
    !isNaN(Number((firstChar + '').toString()));

  return !firstCharIsDigit
    ? null
    : { anExpectedStringNameStartWithDigit: true };
}
