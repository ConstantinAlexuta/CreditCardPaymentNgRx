import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpViewAllDashboardComponent } from './ccp-view-all-dashboard.component';

describe('CcpViewAllDashboardComponent', () => {
  let component: CcpViewAllDashboardComponent;
  let fixture: ComponentFixture<CcpViewAllDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcpViewAllDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcpViewAllDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
