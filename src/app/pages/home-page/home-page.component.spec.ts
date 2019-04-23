import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateHomePageComponent } from './home-page.component';

describe('PrivateHomePageComponent', () => {
  let component: PrivateHomePageComponent;
  let fixture: ComponentFixture<PrivateHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
