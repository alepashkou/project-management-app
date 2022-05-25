import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/boards.model';

@Pipe({
  name: 'sortTask',
})
export class SortTaskPipe implements PipeTransform {
  transform(array: Task[] | undefined): Task[] | undefined {
    if (array) {
      return array.sort((a, b) => a.order - b.order);
    }
    return undefined;
  }
}
