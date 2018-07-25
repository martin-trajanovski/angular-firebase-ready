import { Component, OnInit } from '@angular/core';
import { CompaniesListService } from './companies-list.service';
import { Company } from '../company-card/company.model';

@Component({
	selector: 'fov-companies-list',
	templateUrl: './companies-list.component.html',
	styleUrls: ['./companies-list.component.scss']
})
export class CompaniesListComponent implements OnInit {

	companies: Company[] = [];
	private industries: Array<string> = [];
	filterArray: Array<string> = [];
	queryString: string;

	constructor(private CompaniesService: CompaniesListService) { }

	ngOnInit() {
		this.getAllCompanies();

		this.CompaniesService.filterChanged.subscribe((filterArray: Array<string>) => {
			this.filterArray = filterArray;
		});

		this.CompaniesService.queryStringChanged.subscribe((queryString: string) => {
			this.queryString = queryString;
		});

		this.CompaniesService.companiesChanged.subscribe((companies: Company[]) => {
			this.companies = [];
			this.industries = [];

			this.setCompanies(companies);
		});
	}

	private getAllCompanies() {
		this.CompaniesService.getCompanies()
		.then((result: Company[]) => {
			this.setCompanies(result);
		});
	}

	private setCompanies(companies) {
		companies.forEach(element => {
			if (element.isActive) {
				this.insertElement(element);
				this.insertUniqueIndustry(element);
			}
		});

		if (this.filterArray.length > 0 && !this.filterArray.every(val => this.industries.includes(val))) {
			while (this.filterArray.length > 0) {
				this.filterArray.pop();
			}
		}

		this.CompaniesService.setUniqueIndustries(this.industries);
	}

	private insertElement(element) {
		this.companies.push(
			new Company(
				element._id,
				element.isActive,
				element.company,
				element.about,
				element.logo || 'https://via.placeholder.com/500x270',
				element.industry,
				element.projects
			)
		);
	}

	private insertUniqueIndustry(element) {
		if (this.industries.indexOf(element.industry) === -1) {
			this.industries.push(element.industry);
		}
	}

	getVisibility(company) {
		if ((this.filterArray.length > 0 && this.filterArray.indexOf(company.industry) === -1)) {
			return true;
		} else {
			return false;
		}
	}
}
