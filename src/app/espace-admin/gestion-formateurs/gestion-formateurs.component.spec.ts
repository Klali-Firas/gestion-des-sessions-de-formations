import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionFormateursComponent } from './gestion-formateurs.component';

describe('GestionFormateursComponent', () => {
  let component: GestionFormateursComponent;
  let fixture: ComponentFixture<GestionFormateursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionFormateursComponent]
    });
    fixture = TestBed.createComponent(GestionFormateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
