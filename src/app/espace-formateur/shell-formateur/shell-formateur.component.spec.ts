import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellFormateurComponent } from './shell-formateur.component';

describe('ShellFormateurComponent', () => {
  let component: ShellFormateurComponent;
  let fixture: ComponentFixture<ShellFormateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShellFormateurComponent]
    });
    fixture = TestBed.createComponent(ShellFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
