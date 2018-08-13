import { Component, OnInit, Input } from '@angular/core';
import { Company } from './company.model';
import { CompaniesListService } from '../companies-list/companies-list.service';

@Component({
	selector: 'afr-company-card',
	templateUrl: './company-card.component.html',
	styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {
	@Input() company: Company;

	constructor(
		private CompanyService: CompaniesListService
	) { }

	ngOnInit() {
	}

	onSelect(company) {
		this.CompanyService.setSelectedCompany(company);
	}

	removeCompany(event, company) {
		const message = confirm(`Are you sure you want to delete ${company.company}?`);

		if (message) {
			this.CompanyService.removeCompany(company);
		}

		event.stopPropagation();
	}

}
