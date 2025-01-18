import { TestBed } from '@angular/core/testing';

import { AgentAPIService } from './agent.api.service';

describe('AgentAPIService', () => {
  let service: AgentAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
