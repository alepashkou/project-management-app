import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from '../../models/boards.model';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss']
})
export class BoardCardComponent  {
  @Input() board: Board;
  @Output() deleteDialog = new EventEmitter();
  @Output() editDialog = new EventEmitter();

  constructor(private router:Router) {}

  public goToBoard(){
    const linkId = this.board.id.substring(0, 8)
    this.router.navigate(['board', linkId])
  }
}
