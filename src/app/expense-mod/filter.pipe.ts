import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(allUsers: any[], filterVAlue:string): any {


    return allUsers.filter(i => 

    (((i.firstName+" "+i.lastName).toLowerCase()).includes(filterVAlue.toLowerCase()))
    )
  }

}