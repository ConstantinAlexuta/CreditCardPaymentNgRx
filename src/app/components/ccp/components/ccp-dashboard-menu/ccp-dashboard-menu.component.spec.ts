import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpDashboardMenuComponent } from './ccp-dashboard-menu.component';

describe('CcpDashboardMenuComponent', () => {
  let component: CcpDashboardMenuComponent;
  let fixture: ComponentFixture<CcpDashboardMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcpDashboardMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcpDashboardMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
