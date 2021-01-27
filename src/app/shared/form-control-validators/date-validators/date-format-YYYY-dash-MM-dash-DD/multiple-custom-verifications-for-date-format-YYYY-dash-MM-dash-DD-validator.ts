import { FormControl } from '@angular/forms';

// yyyy-mm-dd
export function multipleCustomVerificationsForDateFormatYYYdMMdDDValidator(
  control: FormControl
) {
  // let dateString = control.value;

  // let dateStringLength = control.value.length;

  // if (dateStringLength == 0) {
  //   return null;
  // } else if (dateStringLength <= 4 && !/^\d*$/.test(dateString)) {
  //   return { yearNotContainOnlyDigits: true };
  // }

  // if (dateStringLength == 4) {
  //   let yearString = dateString.substring(0, 4);
  //   let year = parseInt(yearString, 10);

  //   let currentDate: any = new Date();
  //   let currentYear = +currentDate.getFullYear();

  //   if (!(year >= currentYear && year <= currentYear + 100))
  //     return {
  //       yearIsNotGreaterOrEqualWithCurrentYearAndLessThanPlus100Years: true,
  //     };
  // }

  // if (dateStringLength == 5) {
  //   let char5 = dateString.substring(4, 5);

  //   if (char5 != '-')
  //     return {
  //       afterYearMustBeADash: true,
  //     };
  // }

  return {
    yearIsNotGreaterOrEqualWithCurrentYearAndLessThanPlus100Years: true,
  };
}
