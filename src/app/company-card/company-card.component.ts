import { Component, OnInit, Input } from '@angular/core';
import { Company } from './company.model';
import { CompaniesListService } from '../companies-list/companies-list.service';
import { Router } from '@angular/router';

@Component({
	selector: 'fov-company-card',
	templateUrl: './company-card.component.html',
	styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {
	@Input() company: Company;

	constructor(
		private CompanyService: CompaniesListService,
		private router: Router
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

		// this.router.navigate(['/company']);

		event.stopPropagation();
	}

}
