import { TestBed } from '@angular/core/testing';

import { AdminMainServiceService } from './admin-main-service.service';

describe('AdminMainServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminMainServiceService = TestBed.get(AdminMainServiceService);
    expect(service).toBeTruthy();
  });
});
