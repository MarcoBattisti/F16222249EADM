import { TestBed } from '@angular/core/testing';

import { CarouselItemService } from './carousel-item.service';

describe('CarouselItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarouselItemService = TestBed.get(CarouselItemService);
    expect(service).toBeTruthy();
  });
});
