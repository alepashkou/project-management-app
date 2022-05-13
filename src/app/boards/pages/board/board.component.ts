import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Board } from '../../models/boards.model';
import { BoardService } from '../../services/board.service';
import { DialogColumComponent } from '../../components/dialog-colum/dialog-colum.component';
import { Task, Colum } from '../../models/boards.model';
import { UserResponce } from '../../models/dialog.model';
import { map } from 'rxjs';
import { DialogTaskComponent } from '../../components/dialog-task/dialog-task.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Output() update = new EventEmitter<string>();
  board: Board;

  id: string;

  allUsers: UserResponce[];

  constructor(
    private route: ActivatedRoute,
    private boardService: BoardService,
    private dialog: MatDialog,
    private router: Router
  ) {
    //this.id = this.route.snapshot.params['id'];
    route.params.pipe(
      map((params) => params['id'])
    ).subscribe(
      (id) => {
        this.id = id;
        this.loadData()
      }
    )
    route.queryParams.pipe(
      map((queryParams) => queryParams['openTask'])
    ).subscribe(
      (openTask) => {
        this.tryOpenDialog(this.board, openTask)
      }
    )
  }

  loadData(): void {
    this.boardService.getBoard(this.id).subscribe((board) => {
      this.board = board;
      const taskId = this.route.snapshot.queryParams['openTask'];
      this.tryOpenDialog(this.board, taskId)
    });
    this.boardService
      .getAllUsers()
      .subscribe((users) => (this.allUsers = users));
  }

  drop(event: CdkDragDrop<any>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateOrderTask(event.container.id);
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
    this.updateOrderColum();
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
      .createColum(
        title,
        this.board.id,
        this.generateRandomOrder(this.board.columns?.length)
      )
      .subscribe((colum) => {
        colum.tasks = [];
        this.board.columns?.push(colum);
      });
  }
  chageTaskColum(columIdPrev: string, columIdNew: string, task: Task) {
    this.boardService
      .updateTask(this.board.id, columIdPrev, task, columIdNew)
      .subscribe(() => {
        this.updateOrderTask(columIdPrev);
        this.updateOrderTask(columIdNew);
      });
  }
  generateRandomOrder(lenght: number = 0) {
    return (
      Math.floor(Math.random() * ((lenght + 1) * 10000 - lenght * 10000)) +
      lenght * 10000
    );
  }
  updateOrderColum() {
    this.board.columns?.forEach((column, index) => {
      this.boardService
        .updateColum(
          this.board.id,
          column.id,
          column.title,
          this.generateRandomOrder(index)
        )
        .subscribe();
    });
  }
  updateOrderTask(id: string) {
    const currentColum = this.board.columns?.find((colum) => colum.id === id);
    const order = currentColum?.tasks?.map((el, index) => {
      return {
        id: el.id,
        order: index,
      };
    });
    this.boardService.updateOrderTask(order).subscribe();
  }
  updateBoard() {
    this.loadData();
  }

  tryOpenDialog(board?: Board, taskId?: string) {
    if (board && taskId) {
      const searchTask = findTask(board, taskId)
      if (searchTask) {
        this.openTaskDialog(searchTask.column, searchTask.task)
        this.router.navigate(['.'], {
          relativeTo: this.route,
          queryParams: {
          }
        })
      }
    }
  }

  openTaskDialog(column: Colum, task: Task) {
    const dialog = this.dialog.open(DialogTaskComponent, {
      width: '300px',
      data: { action: 'Edit', task },
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.event === 'Create') {
        this.updateTask(result.data.task, column);
        this.loadData();
      }
    });
  }

  updateTask(task: Task, column: Colum) {
    this.boardService
      .updateTask(this.id, column.id, task)
      .subscribe(() => {
        this.update.emit(task.id);
      });
  }
}

function findTask(board: Board, taskId: string) {
  if (board.columns) {
    for (let column of board.columns) {
      if (column.tasks) {
        for (let task of column.tasks) {
          if (task.id === taskId) {
            return { column, task }
          }
        }
      }
    }
  }
  return null
}