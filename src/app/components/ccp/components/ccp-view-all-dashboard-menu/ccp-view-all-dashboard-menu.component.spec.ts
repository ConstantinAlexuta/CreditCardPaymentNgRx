import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpViewAllDashboardMenuComponent } from './ccp-view-all-dashboard-menu.component';

describe('CcpViewAllDashboardMenuComponent', () => {
  let component: CcpViewAllDashboardMenuComponent;
  let fixture: ComponentFixture<CcpViewAllDashboardMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcpViewAllDashboardMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcpViewAllDashboardMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
