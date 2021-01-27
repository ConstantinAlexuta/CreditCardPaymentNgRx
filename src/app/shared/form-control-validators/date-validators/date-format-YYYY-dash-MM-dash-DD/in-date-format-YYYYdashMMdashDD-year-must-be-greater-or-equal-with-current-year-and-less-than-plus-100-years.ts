import { FormControl } from '@angular/forms';

// YYYY-MM-DD
export function inDateFormatYYYYdashMMdashDDYearMustBeGreaterOrEqualWithCurrentYearAndLessThanPlus100Years(
  control: FormControl
) {
  let dateString = control.value;

  let dateStringLength = control.value.length;

  let yearString = dateString.substring(0, Math.min(dateStringLength, 4));

  if (dateStringLength >= 4 && /^\d*$/.test(yearString)) {
    let yearString = dateString.substring(0, 4);
    let year = parseInt(yearString, 10);

    let currentDate: any = new Date();
    let currentYear = +currentDate.getFullYear();

    if (!(year >= currentYear && year <= currentYear + 100))
      return {
        yearIsNotGreaterOrEqualWithCurrentYearAndLessThanPlus100Years: true,
      };
  }

  return null;
}
