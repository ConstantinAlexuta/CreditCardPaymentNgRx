import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { SERVER_API_V1 } from 'src/app/app.constants';
import { Ccp } from '../../model/ccp.model';
import { ItemService } from 'src/app/shared/services/item.service';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AppState } from 'src/store/reducers';
import { getCcps } from '../../state/ccp.selectors';
import { ccpActionTypes } from '../../state/ccp.actions';

@Component({
  selector: 'app-ccp-view-one',
  templateUrl: './ccp-view-one.component.html',
  styleUrls: ['./ccp-view-one.component.scss'],
})
export class CcpViewOneComponent implements OnInit {
  // ccps!: Observable<Ccp[]>;
  ccps!: Ccp[];
  items!: any;

  ccp!: Ccp;

  ccpToBeUpdated!: Ccp | null;

  isUpdateActivated: boolean = false;

  itemCapitalizeFullName: string = 'Credit Card Payment';
  itemCamelName: string = 'ccp';
  itemLowerCaseDashName: string = 'ccp';
  itemNameDisplayed: string = 'Credit Card Payment';

  itemNameItem: string = 'ccp';
  itemDashItem: string = 'ccp';

  item!: Ccp;
  itemHeaders: string[] = [
    'Internal id',
    'Credit Card Number',
    'Card Holder',
    'Expiration Date',
    'Amount',
    'Security Code (CCV)',
  ];
  itemFields: string[] = [
    'id',
    'creditCardNumber',
    'cardHolder',
    'expirationDate',
    'amount',
    'securityCodeCCV',
  ];
  //
  // ###################################################
  //
  currentId: any;
  newIdRequest: any = -1;
  pathId!: string;
  pageBrandViewOneItem!: string;
  currentShortRouter!: string; // view-one
  //
  // ###################################################
  //

  // ###################################################
  constructor(
    private store: Store<AppState>,
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute
  ) {
    this.currentShortRouter = activatedRoute.snapshot.url[0].path; // view

    setInterval(() => {
      this.newIdRequest = this.activatedRoute.snapshot.parent?.params.id;

      if (this.currentId != this.newIdRequest) {
        this.currentId = this.newIdRequest;

        this.pathId = SERVER_API_V1 + this.itemDashItem + '/' + this.currentId; //  e.g.:  '/server/api/v1/ccp/id';
        // this.getItem(this.pathId);

        this.pageBrandViewOneItem = this.item.cardHolder!;
      }
    }, 100);
  }

  // ###################################################
  // async ngOnChanges(changes: SimpleChanges): Promise<void> {
  //   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //   //Add '${implements OnChanges}' to the class.
  //   this.currentId = await this.activatedRoute.snapshot.parent?.params.id;
  //   this.pathId =
  //     SERVER_API_V1 + this.itemDashItem + '/' + (await this.currentId); //  e.g.:  '/server/api/v1/ccp/id';
  //   await this.getItem(this.pathId);

  //   this.pageBrandViewOneItem = this.item.cardHolder!;
  // }

  async ngOnInit(): Promise<void> {
    this.currentId = await this.activatedRoute.snapshot.parent?.params.id;

    this.pathId =
      SERVER_API_V1 + this.itemDashItem + '/' + (await this.currentId); //  e.g.:  '/server/api/v1/ccp/id';

    this.store.select(getCcps).subscribe(
      (data) => {
        this.ccps = data;
        this.item = this.ccps[this.currentId];
      },
      (err) => console.error(err),
      () => console.log('items array loaded')
    );

    // let ccps: Ccp[] = await this.ccps.toPromise();

    // this.ccp = ccps[this.currentId];
    // this.item = ccps[this.currentId];

    // this.item = this.store.select(getCcps).toPromise()[this.currentId];

    setTimeout(() => {
      // ccps.forEach((item) => {
      //   if (item.id == this.currentId) {
      //     this.ccp = item;
      //     this.item = item;
      //   }
      // });
      // this.item = ccps[this.currentId];
    }, 1000);

    this.showItemListEmptyMessageAfterDelay();

    // await this.getItem(this.pathId);

    this.pageBrandViewOneItem = this.item.cardHolder!;
  }

  async getItem(pathId: string) {
    (await this.itemService.getItem(pathId)).subscribe(
      (data) => {
        this.items = data;
      },
      (err) => console.error(err),
      () => console.log('ccp with path ' + pathId + ' was loaded')
    );
  }

  isAfterDelay: boolean = false;

  showItemListEmptyMessageAfterDelay() {
    setTimeout(() => {
      this.isAfterDelay = true;
    }, 1500);
  }

  //
  // ###################################################
  //

  deleteCcp(ccpId: string | number) {
    this.store.dispatch(ccpActionTypes.deleteCcp({ ccpId }));
  }

  showUpdateCcpForm(ccp: Ccp) {
    this.ccpToBeUpdated = { ...ccp };
    this.isUpdateActivated = true;
  }

  updateCcp(updateCcpForm: any) {
    const update: Update<Ccp> = {
      id: +this.ccpToBeUpdated!.id!,
      changes: {
        ...this.ccpToBeUpdated,
        ...updateCcpForm.value,
      },
    };

    this.store.dispatch(ccpActionTypes.updateCcp({ update }));

    this.isUpdateActivated = false;

    this.ccpToBeUpdated = null;
  }
}
