import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpViewAllComponent } from './ccp-view-all.component';

describe('CcpViewAllComponent', () => {
  let component: CcpViewAllComponent;
  let fixture: ComponentFixture<CcpViewAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcpViewAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcpViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
