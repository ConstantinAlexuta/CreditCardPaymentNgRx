import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// import { SERVER_API_V1 } from 'src/app/app.constants';
// import { ItemService } from 'src/app/shared/services/item.service';
import { Ccp } from '../../model/ccp.model';
import { ccpActionTypes } from '../../state/ccp.actions';
import { AppState } from 'src/store/reducers';
import { getCcps } from '../../state/ccp.selectors';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'app-ccp-view-all',
  templateUrl: './ccp-view-all.component.html',
  styleUrls: ['./ccp-view-all.component.scss'],
})
export class CcpViewAllComponent implements OnInit {
  //
  // ###################################################
  itemNameItem: string = 'ccp';
  itemDashItem: string = 'ccp';
  // path: string = SERVER_API_V1 + this.itemDashItem; //  e.g.:  '/server/api/v1/ccp';
  // items!: Array<Ccp>;

  // itemHeaders: string[] = [
  //   'Id',
  //   'Credit Card Number',
  //   'Card Holder',
  //   'Expiration Date',
  //   'Amount',
  //   'Security Code (CCV)',
  // ];
  // itemFields: string[] = [
  //   'id',
  //   'creditCardNumber',
  //   'cardHolder',
  //   'expirationDate',
  //   'amount',
  //   'securityCodeCCV',
  // ];
  // ###################################################

  ccps!: Observable<Ccp[]>;

  ccpToBeUpdated!: Ccp | null;

  isUpdateActivated: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.ccps = this.store.select(getCcps);
  }

  deleteCcp(ccpId: string | number) {
    this.store.dispatch(ccpActionTypes.deleteCcp({ ccpId }));
  }

  showUpdateCcpForm(ccp: Ccp) {
    this.ccpToBeUpdated = { ...ccp };
    this.isUpdateActivated = true;
  }

  updateCcp(updateCcpForm: any) {
    const update: Update<Ccp> = {
      id: this.ccpToBeUpdated!.id!,
      changes: {
        ...this.ccpToBeUpdated,
        ...updateCcpForm.value,
      },
    };

    this.store.dispatch(ccpActionTypes.updateCcp({ update }));

    this.isUpdateActivated = false;

    this.ccpToBeUpdated = null;
  }

  // async ngOnInit(): Promise<void> {
  //   await this.getItems();
  //   this.showItemListEmptyMessageAfterDelay();
  // }

  // async getItems() {
  //   (await this.itemService.getItems(this.path)).subscribe(
  //     (data) => {
  //       this.items = data;
  //       console.log(data);
  //     },
  //     (err) => {
  //       console.error(err);
  //     },
  //     () => {
  //       console.log(this.itemNameItem + ' items was loaded from server');
  //     }
  //   );
  // }

  isAfterDelay: boolean = false;

  // showItemListEmptyMessageAfterDelay() {
  //   setTimeout(() => {
  //     this.isAfterDelay = true;
  //   }, 1500);
  // }
}
