import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNewsComponent } from './card-news.component';

describe('CardNewsComponent', () => {
  let component: CardNewsComponent;
  let fixture: ComponentFixture<CardNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
