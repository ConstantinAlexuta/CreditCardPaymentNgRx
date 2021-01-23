import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpEditMoreComponent } from './ccp-edit-more.component';

describe('CcpEditMoreComponent', () => {
  let component: CcpEditMoreComponent;
  let fixture: ComponentFixture<CcpEditMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcpEditMoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcpEditMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
