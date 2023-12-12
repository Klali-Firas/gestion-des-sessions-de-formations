import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCandidatComponent } from './modifier-candidat.component';

describe('ModifierCandidatComponent', () => {
  let component: ModifierCandidatComponent;
  let fixture: ComponentFixture<ModifierCandidatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierCandidatComponent]
    });
    fixture = TestBed.createComponent(ModifierCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
