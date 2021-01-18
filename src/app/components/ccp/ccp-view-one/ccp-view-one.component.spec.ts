import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpViewOneComponent } from './ccp-view-one.component';

describe('CcpViewOneComponent', () => {
  let component: CcpViewOneComponent;
  let fixture: ComponentFixture<CcpViewOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcpViewOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcpViewOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
