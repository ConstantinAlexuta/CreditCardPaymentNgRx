import { TestBed } from '@angular/core/testing';

import { CcpResolver } from './ccp.resolver';

describe('CcpResolver', () => {
  let resolver: CcpResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CcpResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
