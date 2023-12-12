import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFormateurComponent } from './nav-formateur.component';

describe('NavFormateurComponent', () => {
  let component: NavFormateurComponent;
  let fixture: ComponentFixture<NavFormateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavFormateurComponent]
    });
    fixture = TestBed.createComponent(NavFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
