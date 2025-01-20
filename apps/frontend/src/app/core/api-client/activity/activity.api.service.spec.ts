import { TestBed } from '@angular/core/testing';
import { ActivityAPIService } from './activity.api.service';

describe('ActivityAPIService', () => {
  let service: ActivityAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivityAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
