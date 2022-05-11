import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardColumComponent } from './board-colum.component';

describe('BoardColumComponent', () => {
  let component: BoardColumComponent;
  let fixture: ComponentFixture<BoardColumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardColumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardColumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
