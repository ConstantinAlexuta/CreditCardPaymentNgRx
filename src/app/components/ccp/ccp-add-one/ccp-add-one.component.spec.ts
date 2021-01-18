import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpAddOneComponent } from './ccp-add-one.component';

describe('CcpAddOneComponent', () => {
  let component: CcpAddOneComponent;
  let fixture: ComponentFixture<CcpAddOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcpAddOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcpAddOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
