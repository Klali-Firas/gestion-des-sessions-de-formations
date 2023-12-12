import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesFormationsFormateurComponent } from './mes-formations-formateur.component';

describe('MesFormationsFormateurComponent', () => {
  let component: MesFormationsFormateurComponent;
  let fixture: ComponentFixture<MesFormationsFormateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesFormationsFormateurComponent]
    });
    fixture = TestBed.createComponent(MesFormationsFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
