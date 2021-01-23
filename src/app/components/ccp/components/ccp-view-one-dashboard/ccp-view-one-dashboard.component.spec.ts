import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpViewOneDashboardComponent } from './ccp-view-one-dashboard.component';

describe('CcpViewOneDashboardComponent', () => {
  let component: CcpViewOneDashboardComponent;
  let fixture: ComponentFixture<CcpViewOneDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcpViewOneDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcpViewOneDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
