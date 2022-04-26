import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from '../../models/boards.model';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss']
})
export class BoardCardComponent  {
  @Input() board: Board;
  @Output() deleteDialog = new EventEmitter();
}