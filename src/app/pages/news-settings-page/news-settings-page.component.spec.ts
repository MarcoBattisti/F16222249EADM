import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSettingsPageComponent } from './news-settings-page.component';

describe('NewsSettingsPageComponent', () => {
  let component: NewsSettingsPageComponent;
  let fixture: ComponentFixture<NewsSettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsSettingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
