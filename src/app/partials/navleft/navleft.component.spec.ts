import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavleftComponent } from './navleft.component';

describe('NavleftComponent', () => {
  let component: NavleftComponent;
  let fixture: ComponentFixture<NavleftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavleftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavleftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
