import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogColumComponent } from './dialog-colum.component';

describe('DialogColumComponent', () => {
  let component: DialogColumComponent;
  let fixture: ComponentFixture<DialogColumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogColumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogColumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
