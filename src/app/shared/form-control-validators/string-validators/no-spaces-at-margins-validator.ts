import { FormControl } from '@angular/forms';

export function noSpacesAtMarginsValidator(control: FormControl) {
  return control.value.trim().length == control.value.length
    ? null
    : { spacesArePresentAtMargins: true };
}
