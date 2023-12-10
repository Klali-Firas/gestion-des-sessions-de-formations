import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCandidatComponent } from './nav-candidat.component';

describe('NavCandidatComponent', () => {
  let component: NavCandidatComponent;
  let fixture: ComponentFixture<NavCandidatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavCandidatComponent]
    });
    fixture = TestBed.createComponent(NavCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
