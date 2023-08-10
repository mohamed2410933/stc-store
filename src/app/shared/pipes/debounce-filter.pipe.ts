import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Pipe({
  name: 'debounceFilter'
})
// export class DebounceFilterPipe implements PipeTransform {
//   transform(items: any[], searchInput: string) {
//     if (!items || !searchInput) {
//       return of(items); 
//     }

//     return of(searchInput).pipe(
//       debounceTime(300), 
//       switchMap(query => {
//         const filteredItems = items.filter(item =>
//           item.title.toLowerCase().includes(query.toLowerCase())
//         );
//         return of(filteredItems);
//       })
//     );
//   }
// }
export class DebounceFilterPipe implements PipeTransform {
  transform(items: any[], searchInput: string): any[] {
    if (!items || !searchInput) {
      return items; // Return original array if items or searchInput are not available
    }

    const query = searchInput.toLowerCase();
    return items.filter(item => item.title.toLowerCase().includes(query));
  }
}