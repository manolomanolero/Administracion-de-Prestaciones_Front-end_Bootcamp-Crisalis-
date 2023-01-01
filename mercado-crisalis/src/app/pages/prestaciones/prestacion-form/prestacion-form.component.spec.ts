import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestacionFormComponent } from './prestacion-form.component';

describe('PrestacionFormComponent', () => {
  let component: PrestacionFormComponent;
  let fixture: ComponentFixture<PrestacionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestacionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
