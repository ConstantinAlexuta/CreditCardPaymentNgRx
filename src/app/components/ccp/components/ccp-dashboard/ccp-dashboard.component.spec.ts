import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpDashboardComponent } from './ccp-dashboard.component';

describe('CcpDashboardComponent', () => {
  let component: CcpDashboardComponent;
  let fixture: ComponentFixture<CcpDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcpDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcpDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
