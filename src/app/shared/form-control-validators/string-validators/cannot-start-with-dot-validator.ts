import { FormControl } from '@angular/forms';

export function cannotStartWithDotValidator(control: FormControl) {
  let afterTrimStartWithDot = control.value.charAt(0) == '.';

  return !afterTrimStartWithDot ? null : { dotIsFirstCharacterAfterTrim: true };
}
