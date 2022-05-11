import { Pipe, PipeTransform } from '@angular/core';
import { Colum } from '../models/boards.model';

@Pipe({
  name: 'sortColumns',
})
export class SortColumnsPipe implements PipeTransform {
  transform(array: Colum[] | undefined): Colum[] | undefined {
    if (array) {
      return array.sort((a, b) => a.order - b.order);
    }
    return undefined;
  }
}
