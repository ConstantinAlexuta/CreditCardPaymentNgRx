export class Status {
  value?:
    | 'NEW'
    | 'DRAFT'
    | 'DUPLICATE'
    | 'VERIFIED'
    | 'APPROVED'
    | 'ACTIVE'
    | 'INCOMPLETE'
    | 'DISABLED'
    | 'ARCHIVED';

  constructor(
    value:
      | 'NEW'
      | 'DRAFT'
      | 'DUPLICATE'
      | 'VERIFIED'
      | 'APPROVED'
      | 'ACTIVE'
      | 'INCOMPLETE'
      | 'DISABLED'
      | 'ARCHIVED'
  ) {
    this.value = value;
  }
}
