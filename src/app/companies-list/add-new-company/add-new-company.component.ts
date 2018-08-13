import { Component, OnInit } from '@angular/core';
import { Company } from '../../company-card/company.model';
import { CompaniesListService } from '../companies-list.service';
import { Router } from '@angular/router';

@Component({
	selector: 'afr-add-new-company',
	templateUrl: './add-new-company.component.html',
	styleUrls: ['./add-new-company.component.scss']
})
export class AddNewCompanyComponent implements OnInit {
	newCompany: Company = new Company('', true, '', '', 'https://picsum.photos/500/400/?random', '', []);
	newCompanyCopy: Company;

	constructor(
		private CompanyService: CompaniesListService,
		private router: Router
	) { }

	clear() {
		this.newCompany = {...this.newCompanyCopy};
	}

	addCompany() {
		this.CompanyService.insertCompany(this.newCompany)
		.then((result: Company) => {
			this.router.navigate(['/company/', result._id]);
		});
	}

	ngOnInit() {
		this.CompanyService.getCompanies();

		this.newCompanyCopy = {...this.newCompany};
	}

}
