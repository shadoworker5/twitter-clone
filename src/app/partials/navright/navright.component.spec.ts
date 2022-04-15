import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavrightComponent } from './navright.component';

describe('NavrightComponent', () => {
  let component: NavrightComponent;
  let fixture: ComponentFixture<NavrightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavrightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavrightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
