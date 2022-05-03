import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Board } from '../../models/boards.model';
import { BoardService } from '../../services/board.service';
import { DialogColumComponent } from '../../components/dialog-colum/dialog-colum.component';
import { Task } from '../../models/boards.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  board: Board;

  id: string;

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private dialog: MatDialog
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.boardService.getBoard(this.id).subscribe((board) => {
      this.board = board;
      this.board.columns = this.board.columns?.sort(
        (a, b) => a.order - b.order
      );
    });
  }

  drop(event: CdkDragDrop<any>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const eventTask = event.previousContainer.data.find(
        (el: Task) => el.id === event.item.element.nativeElement.id
      );
      this.chageTaskColum(
        event.previousContainer.id,
        event.container.id,
        eventTask
      );
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  dropColum(event: CdkDragDrop<string[]>): void {
    if (this.board.columns)
      moveItemInArray(
        this.board.columns,
        event.previousIndex,
        event.currentIndex
      );
  }
  openDialog(action: string): void {
    const dialog = this.dialog.open(DialogColumComponent, {
      width: '300px',
      data: { action },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.event === 'Create') {
        this.createColum(result.data.title);
      }
    });
  }
  createColum(title: string): void {
    this.boardService
      .createColum(title, this.board.id, this.board.columns?.length)
      .subscribe((colum) => this.board.columns?.push(colum));
  }
  chageTaskColum(columIdPrev: string, columIdNew: string, task: Task) {
    this.boardService
      .updateTask(this.board.id, columIdPrev, task, columIdNew)
      .subscribe();
  }
  updateBoard() {
    this.ngOnInit();
  }
}
