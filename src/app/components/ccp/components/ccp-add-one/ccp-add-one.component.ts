import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Status } from 'src/app/shared/classes/status';
import { Ccp } from '../../model/ccp.model';
import { CcpService } from '../../service/ccp.service';

import { v4 as uuidv4 } from 'uuid';
import { AppState } from 'src/store/reducers';
import { Store } from '@ngrx/store';
import { createCcp } from '../../state/ccp.actions';

@Component({
  selector: 'app-ccp-add-one',
  templateUrl: './ccp-add-one.component.html',
  styleUrls: ['./ccp-add-one.component.scss'],
})
export class CcpAddOneComponent implements OnInit {
  public ccpFormGroup!: FormGroup;

  validMessage: string = '';
  // currentRouteUrl: string = this.activatedRoute.toString();
  currentRouteUrl: string = 'DEFAULT';

  constructor(
    private store: Store<AppState>,
    private ccpService: CcpService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // router.events.subscribe((url: any) => {
    this.currentRouteUrl = this.router.url;
    // });
    // console.log(router.url); // to print only path eg:"/login"
  }

  itemName: string = 'Credit Card Payment';

  ngOnInit(): void {
    this.ccpFormGroup = new FormGroup({
      creditCardNumber: new FormControl('', Validators.required),
      cardHolder: new FormControl('', Validators.required),
      expirationDate: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      securityCodeCCV: new FormControl('', Validators.required),
      // status: new FormControl('', Validators.required),
    });
    // this.isSavedSuccessfully = false;
  }

  createdCcp!: Ccp;

  readonlyAfterSave = '';
  isAlreadySaved: boolean = false;

  firstAttemptToSaveWasDone: boolean = false;
  messageFailureForFirstAttemptToSave: string =
    'Failure on saving! The attempt to save the item on server was without success. Unknown cause! Please retry.';

  onSubmit(submittedForm: any) {
    console.log(submittedForm.value);

    if (submittedForm.invalid) {
      return;
    }

    const ccp: Ccp = {
      id: uuidv4(),
      creditCardNumber: submittedForm.value.creditCardNumber,
      cardHolder: submittedForm.value.cardHolder,
      expirationDate: submittedForm.value.expirationDate,
      amount: submittedForm.value.amount,
      securityCodeCCV: submittedForm.value.securityCodeCCV,
    };

    this.store.dispatch(createCcp({ ccp }));

    /*
    if (this.ccpFormGroup.valid) {
      this.validMessage = 'Your new ccp has been submitted.';

      this.ccpService.createCcp(this.ccpFormGroup.value);

      this.firstAttemptToSaveWasDone = true;

      this.readonlyAfterSave = 'readonly';
      this.isAlreadySaved = true;

      this.isSavedSuccessfully = true;

      await this.getLastNewIdSaved();
      await this.getLastNewIdSaved();
      // this.showNewItemCreatedIdMessage = true;

      // this.getLastNewIdSaved();

      if (this.isSavedSuccessfully) {
        this.showNewItemCreatedId();
      }

      // .subscribe(
      //   (data) => {
      //     this.ccpFormGroup.reset();
      //     this.isSavedSuccessfully = true;
      //     this.getSavedObjectId();
      //     this.savedItemId = this.updatedCcps.size;
      //     return true;
      //   },
      //   (error) => {
      //     return Observable.throw(error);
      //   }
      // );
    } else {
      this.validMessage =
        'Please fill out the required fields of the form before submitting!';
      this.isSavedSuccessfully = false;
      this.firstAttemptToSaveWasDone = false;
      this.isAlreadySaved = false;
      this.numberClickedOnSaveWithSuccess = 0;
      this.ifSavingWasWithFailureOnServerSoUnblockFormFields();
    }

    */
  }

  // onSubmit() {
  //   if (this.ccpFormGroup.valid) {
  //     this.validMessage = 'Your new ccp has been submitted.';
  //     this.ccpService
  //       .createCcp(this.ccpFormGroup.value)
  //       .subscribe(
  //         (data) => {
  //           this.ccpFormGroup.reset();
  //           this.isSavedSuccessfully = true;
  //           this.getSavedObjectId();
  //           this.savedItemId = this.updatedCcps.size;
  //           return true;
  //         },
  //         (error) => {
  //           return Observable.throw(error);
  //         }
  //       );
  //   } else {
  //     this.validMessage =
  //       'Please fill out the required fields of the form before submitting!';
  //     this.isSavedSuccessfully = false;
  //   }
  // }

  isSavedSuccessfully: boolean = false;
  savedItemId: number = -1;

  updatedCcps: any;

  getSavedObjectId() {
    this.ccpService.getCcps().subscribe(
      (data) => {
        this.updatedCcps = data;
      },
      (err) => console.error(err),
      () => console.log('updatedCcps loaded to find the last offer saved id')
    );
  }

  numberClickedOnSaveWithSuccess: number = 0;
  showMessageOnClikedSaveTwice: boolean = false;
  messageOnClikedSaveTwice: string = 'This item was already saved.';
  onClickSaveTwice() {
    this.numberClickedOnSaveWithSuccess++;
    if (this.numberClickedOnSaveWithSuccess == 2) {
      this.showMessageOnClikedSaveTwice = true;
      this.validMessage = '';
    }
  }

  ifSavingWasWithFailureOnServerSoUnblockFormFields() {
    if (this.firstAttemptToSaveWasDone && !this.isSavedSuccessfully) {
      this.readonlyAfterSave = '';
      this.isAlreadySaved = false;
    }
  }

  reloadThisPage() {
    // this.router.navigate(['../add-one?refresh=1']);
    // this.router.navigate([this.router.url + '?refresh=1']);
    // this.router.navigate([this.currentRouteUrl + '?refresh=1']);
    // this.router.navigate(['../ccp/add-one']);
    // ccp/add-one
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    // this.router.navigate(['/same-route']);
    this.router.navigate([this.currentRouteUrl]);
  }

  lastNewIdSaved: number = -1;
  async getLastNewIdSaved() {
    this.ccpService.getCcps().subscribe((data) => {
      this.lastNewIdSaved = +data.reverse().find((x) => x.id)?.id!;
    });
  }

  goToLastSavedItemView() {
    this.getLastNewIdSaved();
    this.getLastNewIdSaved(); // let them two

    this.router.navigate(['../ccp/view-one', +this.lastNewIdSaved]);
    // 'ccp/view-one/36/view';
  }

  goToLastSavedItemEditView() {
    this.getLastNewIdSaved();
    this.getLastNewIdSaved(); // let them two

    this.router.navigate([
      // '../ccp/view-one',
      // +this.lastNewIdSaved,
      // +'edit',
      '../ccp/view-one/' + +this.lastNewIdSaved + '/edit',
    ]);
    // 'ccp/view-one/36/edit';
  }

  showNewItemCreatedIdMessage: boolean = false;
  newItemCreatedIdMessage: string = '';
  async showNewItemCreatedId() {
    await this.delay(1000);
    this.getLastNewIdSaved();
    this.getLastNewIdSaved(); // let them two

    // await this.delay(300);
    // this.getLastNewIdSaved();
    await this.delay(2000);
    this.newItemCreatedIdMessage =
      // Success feedback from server database.
      'The new item created has the id ' + +this.lastNewIdSaved + '.';
    this.showNewItemCreatedIdMessage = true;
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  statuses: Status[] = [
    { value: 'NEW' },
    { value: 'DRAFT' },
    { value: 'VERIFIED' },
    { value: 'APPROVED' },
    { value: 'ACTIVE' },
    { value: 'INCOMPLETE' },
    { value: 'DISABLED' },
    { value: 'ARCHIVED' },
  ];
}
