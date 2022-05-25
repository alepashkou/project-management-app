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
import * as XLSX from 'xlsx';
import { isNotNull } from 'src/app/core/utils';

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
      this.changeTaskColum(
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
  changeTaskColum(columIdPrev: string, columIdNew: string, task: Task) {
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
      restoreFocus: false
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.event === 'Edit') {
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

  exportExcel(): void {
    let taskArr: string[][] = []
    taskArr = fillTasksArray(this.board, getTableSize(this.board))
    const worksheet = XLSX.utils.aoa_to_sheet(taskArr);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet, this.board.title);
    XLSX.writeFile(wb, this.board.title + '.xlsx');
  }
}

function findTask(board: Board, taskId: string) {
  if (board.columns) {
    return board.columns.map(
      (column) => column.tasks?.map(task => ({
        column, task
      }))
    ).filter(isNotNull).flat().find((taskCol) => taskCol.task.id === taskId)
  }
  return null
}

function getTableSize(board: Board) {
  if (!board.columns) {
    return { rowLength: 0 }
  }
  let maxTasksLength = Math.max(...board.columns.map((column) => column!.tasks!.length))
  return { rowLength: maxTasksLength }
}

function fillTasksArray(board: Board, tableSize: { rowLength: number }) {
  let rows = []
  for (let i = 0; i < tableSize.rowLength; i++) {
    rows.push(
      board!.columns!.map((column) => column!.tasks![i]?.title)
    )
  }
  const colArr = board!.columns!.map((column) => column.title)
  rows.unshift(colArr)
  return rows
}