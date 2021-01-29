import { FormControl } from '@angular/forms';

// YYYY-MM-DD
export function inDateFormatYYYYdashMMdashDDDayMustContainOnlyDigits(
  control: FormControl
) {
  let dateString = control.value;

  let dateStringLength = control.value.length;

  if (dateStringLength <= 8) return null;

  let dayString = dateString.substring(8, Math.min(dateStringLength, 10));

  return /^\d*$/.test(dayString) ? null : { dayNotContainOnlyDigits: true };
}
