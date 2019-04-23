import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSettingsPageComponent } from './home-settings-page.component';

describe('HomeSettingsPageComponent', () => {
  let component: HomeSettingsPageComponent;
  let fixture: ComponentFixture<HomeSettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSettingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
