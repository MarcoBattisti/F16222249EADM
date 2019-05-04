import { TestBed } from '@angular/core/testing';

import { TimelineServiceService } from './timeline-service';

describe('TimelineServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimelineServiceService = TestBed.get(TimelineServiceService);
    expect(service).toBeTruthy();
  });
});
