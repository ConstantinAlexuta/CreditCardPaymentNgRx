import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpAddMoreComponent } from './ccp-add-more.component';

describe('CcpAddMoreComponent', () => {
  let component: CcpAddMoreComponent;
  let fixture: ComponentFixture<CcpAddMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcpAddMoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcpAddMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
