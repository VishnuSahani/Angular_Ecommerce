import { TestBed } from '@angular/core/testing';

import { AdminEnvService } from './admin-env.service';

describe('AdminEnvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminEnvService = TestBed.get(AdminEnvService);
    expect(service).toBeTruthy();
  });
});
