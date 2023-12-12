import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellAdminComponent } from './shell-admin.component';

describe('ShellAdminComponent', () => {
  let component: ShellAdminComponent;
  let fixture: ComponentFixture<ShellAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShellAdminComponent]
    });
    fixture = TestBed.createComponent(ShellAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
