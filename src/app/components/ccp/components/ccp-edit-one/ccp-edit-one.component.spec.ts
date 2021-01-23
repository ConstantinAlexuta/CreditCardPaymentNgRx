import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpEditOneComponent } from './ccp-edit-one.component';

describe('CcpEditOneComponent', () => {
  let component: CcpEditOneComponent;
  let fixture: ComponentFixture<CcpEditOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcpEditOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcpEditOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
