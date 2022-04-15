import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourToFourComponent } from './four-to-four.component';

describe('FourToFourComponent', () => {
  let component: FourToFourComponent;
  let fixture: ComponentFixture<FourToFourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourToFourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourToFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
