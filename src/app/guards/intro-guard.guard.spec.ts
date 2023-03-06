import { TestBed } from '@angular/core/testing';

import { IntroGuardGuard } from './intro-guard.guard';

describe('IntroGuardGuard', () => {
  let guard: IntroGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IntroGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
