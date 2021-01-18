import { TestBed } from '@angular/core/testing';

import { CcpService } from './ccp.service';

describe('CcpService', () => {
  let service: CcpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CcpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
