import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './pages/main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { MainBoardService } from './services/main-board.service';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { LeftBorderColorDirective } from './directives/left-border-color.directive';

const routes: Routes = [
  { path: '', component: MainComponent },
];

@NgModule({
  declarations: [
    MainComponent,
    BoardCardComponent,
    LeftBorderColorDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  providers:[MainBoardService]
})
export class BoardsModule { }
