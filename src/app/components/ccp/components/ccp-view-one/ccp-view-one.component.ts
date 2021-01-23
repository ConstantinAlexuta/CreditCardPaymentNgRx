import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { SERVER_API_V1 } from 'src/app/app.constants';
import { Ccp } from '../../model/ccp.model';
import { ItemService } from 'src/app/shared/services/item.service';

@Component({
  selector: 'app-ccp-view-one',
  templateUrl: './ccp-view-one.component.html',
  styleUrls: ['./ccp-view-one.component.scss'],
})
export class CcpViewOneComponent implements OnInit {
  //
  // ###################################################
  //
  itemNameItem: string = 'ccp';
  itemDashItem: string = 'ccp';

  item!: Ccp;
  itemHeaders: string[] = [
    'Id',
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

  constructor(
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute
  ) {
    this.currentShortRouter = activatedRoute.snapshot.url[0].path; // view

    setInterval(() => {
      this.newIdRequest = this.activatedRoute.snapshot.parent?.params.id;

      if (this.currentId != this.newIdRequest) {
        this.currentId = this.newIdRequest;

        this.pathId = SERVER_API_V1 + this.itemDashItem + '/' + this.currentId; //  e.g.:  '/server/api/v1/ccp/id';
        this.getItem(this.pathId);

        this.pageBrandViewOneItem = this.item.cardHolder!;
      }
    }, 100);
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.currentId = await this.activatedRoute.snapshot.parent?.params.id;
    this.pathId =
      SERVER_API_V1 + this.itemDashItem + '/' + (await this.currentId); //  e.g.:  '/server/api/v1/ccp/id';
    await this.getItem(this.pathId);

    this.pageBrandViewOneItem = this.item.cardHolder!;
  }

  async ngOnInit(): Promise<void> {
    //
    // ###################################################
    //
    this.currentId = await this.activatedRoute.snapshot.parent?.params.id;
    this.pathId =
      SERVER_API_V1 + this.itemDashItem + '/' + (await this.currentId); //  e.g.:  '/server/api/v1/ccp/id';
    //
    // ###################################################
    //

    this.showItemListEmptyMessageAfterDelay();

    await this.getItem(this.pathId);

    this.pageBrandViewOneItem = this.item.cardHolder!;
  }

  async getItem(pathId: string) {
    (await this.itemService.getItem(pathId)).subscribe(
      (data) => {
        this.item = data;
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
}
