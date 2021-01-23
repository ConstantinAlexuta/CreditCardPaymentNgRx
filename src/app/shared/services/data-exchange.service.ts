import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataExchangeService {
  constructor() {}

  private messageFromCancel = new BehaviorSubject(false);

  currentMessageFromCancel = this.messageFromCancel.asObservable();

  changeMessageFromCancel(status: boolean) {
    this.messageFromCancel.next(status);
  }
}
