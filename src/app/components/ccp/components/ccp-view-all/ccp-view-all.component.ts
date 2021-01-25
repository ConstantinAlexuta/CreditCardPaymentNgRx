import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  itemCapitalizeFullName: string = 'Credit Card Payment';
  itemCamelName: string = 'ccp';
  itemLowerCaseDashName: string = 'ccp';

  items!: Observable<Ccp[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.items = this.store.select(getCcps);
    console.log(this.itemCapitalizeFullName + ' items was loaded from server');
    this.showItemListEmptyMessageAfterDelayIfNoItemsOrNoDatabaseConnection();
  }

  deleteCcp(ccpId: string | number) {
    this.store.dispatch(ccpActionTypes.deleteCcp({ ccpId }));
  }

  itemToBeUpdated!: Ccp | null;
  isUpdateActivated: boolean = false;

  showUpdateCcpForm(ccp: Ccp) {
    this.itemToBeUpdated = { ...ccp };
    this.isUpdateActivated = true;
  }

  updateCcp(updateCcpForm: any) {
    const update: Update<Ccp> = {
      id: this.itemToBeUpdated!.id!,
      changes: {
        ...this.itemToBeUpdated,
        ...updateCcpForm.value,
      },
    };

    this.store.dispatch(ccpActionTypes.updateCcp({ update }));

    this.isUpdateActivated = false;

    this.itemToBeUpdated = null;
  }

  isAfterDelay: boolean = false;

  showItemListEmptyMessageAfterDelayIfNoItemsOrNoDatabaseConnection() {
    setTimeout(() => {
      this.isAfterDelay = true;
    }, 500);
  }

  showInternalIdColumnAndHideOptionsButtons: boolean = false;

  toggleShowInternalIdColumnAndHideOptionsButtons() {
    this.showInternalIdColumnAndHideOptionsButtons = !this
      .showInternalIdColumnAndHideOptionsButtons;
  }
}
