import { TestBed, inject } from '@angular/core/testing';

import { AuthGuardDashboardService } from './auth-guard-dashboard.service';

describe('AuthGuardDashboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardDashboardService]
    });
  });

  it('should be created', inject([AuthGuardDashboardService], (service: AuthGuardDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
