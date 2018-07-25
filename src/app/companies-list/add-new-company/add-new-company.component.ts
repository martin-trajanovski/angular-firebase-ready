import { Component, OnInit } from '@angular/core';
import { Company } from '../../company-card/company.model';
import { CompaniesListService } from '../companies-list.service';
import { Router } from '@angular/router';

@Component({
	selector: 'fov-add-new-company',
	templateUrl: './add-new-company.component.html',
	styleUrls: ['./add-new-company.component.scss']
})
export class AddNewCompanyComponent implements OnInit {
	newCompany: Company = new Company(this.generateUuid(), true, '', '', 'https://via.placeholder.com/500x270', '', []);
	newCompanyCopy: Company;

	constructor(
		private CompanyService: CompaniesListService,
		private router: Router
	) { }

	generateUuid() {
		let uuid = '';
		const allowedChars = 'abcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < 24; i++) {
			uuid += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
		}

		return uuid;
	}

	clear() {
		this.newCompany = {...this.newCompanyCopy};
	}

	addCompany() {
		this.CompanyService.insertCompany(this.newCompany);

		this.router.navigate(['/company/', this.newCompany._id]);
	}

	ngOnInit() {
		this.CompanyService.getCompanies();

		this.newCompanyCopy = {...this.newCompany};
	}

}
