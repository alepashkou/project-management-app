import { Component, Input, OnInit } from '@angular/core';
import { Colum } from '../../models/boards.model';

@Component({
  selector: 'app-board-colum',
  templateUrl: './board-colum.component.html',
  styleUrls: ['./board-colum.component.scss']
})
export class BoardColumComponent {
  @Input() colum: Colum;
}