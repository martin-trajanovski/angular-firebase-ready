import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filterByName'
})
export class FilterByNamePipe implements PipeTransform {

	transform(value: any, input: string): any {
		if (input) {
			input = input.toLowerCase();
			return value.filter(function (el: any) {
				return el.company.toLowerCase().indexOf(input) > -1;
			});
		}
		return value;
	}

}
