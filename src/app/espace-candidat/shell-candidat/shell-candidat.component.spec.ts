import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellCandidatComponent } from './shell-candidat.component';

describe('ShellCandidatComponent', () => {
  let component: ShellCandidatComponent;
  let fixture: ComponentFixture<ShellCandidatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShellCandidatComponent]
    });
    fixture = TestBed.createComponent(ShellCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
