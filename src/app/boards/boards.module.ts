import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './pages/main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { MainBoardService } from './services/main-board.service';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { LeftBorderColorDirective } from './directives/left-border-color.directive';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { BoardComponent } from './pages/board/board.component';
import { BoardService } from './services/board.service';
import { DialogColumComponent } from './components/dialog-colum/dialog-colum.component';
import { DialogTaskComponent } from './components/dialog-task/dialog-task.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: ':id', component: BoardComponent },
];

@NgModule({
  declarations: [
    MainComponent,
    BoardCardComponent,
    LeftBorderColorDirective,
    DialogBoxComponent,
    BoardComponent,
    DialogColumComponent,
    DialogTaskComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [MainBoardService, BoardService],
})
export class BoardsModule {}
