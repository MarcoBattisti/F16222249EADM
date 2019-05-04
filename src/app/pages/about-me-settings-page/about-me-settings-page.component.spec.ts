import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeSettingsPageComponent } from './about-me-settings-page.component';

describe('AboutMeSettingsPageComponent', () => {
  let component: AboutMeSettingsPageComponent;
  let fixture: ComponentFixture<AboutMeSettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutMeSettingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutMeSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
