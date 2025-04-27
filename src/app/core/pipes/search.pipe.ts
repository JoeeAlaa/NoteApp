import { Pipe, PipeTransform } from '@angular/core';
import { IGetNote } from '../interfaces/IGet-note';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arrayOfNotes: IGetNote[], word:string): IGetNote[] {
    return arrayOfNotes.filter((item)=> item.title.toLowerCase().includes(word.toLowerCase()));
  }

}
