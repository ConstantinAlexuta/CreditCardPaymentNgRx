import { FormControl } from '@angular/forms';

export function noSpacesValidator(control: FormControl) {
  return control.value.replace(' ', '').length == control.value.length
    ? null
    : { spacesArePresent: true };
}
