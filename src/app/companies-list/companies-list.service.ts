import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../company-card/company.model';

import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CompaniesListService {
	filterChanged = new EventEmitter<[string]>();
	queryStringChanged = new EventEmitter<string>();
	companiesChanged = new EventEmitter<Company[]>();
	companySelected: Company;
	private companies: Company[] = [];

	private industries: Array<string> = [];

	constructor(private http: HttpClient) { }

	companiesListUrl = environment.api;

	getCompanies() {
		return new Promise(resolve => {
			if (this.companies && this.companies.length > 0) {
				resolve(this.companies);
			} else {
				this.http.get(this.companiesListUrl)
				.subscribe((result: Company[]) => {
					this.companies = result;

					resolve(this.companies);
				});
			}
		});
	}

	getCompanyById(id: string) {
		return new Promise(resolve => {
			if (this.companies && this.companies.length > 0) {
				resolve(this.companies.filter((element: Company) => element._id === id));
			} else {
				this.getCompanies().then((result: Company[]) => {
					resolve(result.filter((element: Company) => element._id === id));
				});
			}
		});
	}

	saveCompanyChanges(company) {
		const elementPos = this.companies.map(function(x) {return x._id; }).indexOf(company._id);

		if (elementPos) {
			this.companies[elementPos] = company;
		}
	}

	insertCompany(companyToInsert) {
		if (companyToInsert && companyToInsert._id) {
			this.companies.unshift(companyToInsert); // Insert company at the very beginning!
		}
	}

	removeCompany(companyToRemove) {
		const elementPos = this.companies.map(function(x) {return x._id; }).indexOf(companyToRemove._id);

		if (elementPos !== -1) {
			this.companies.splice(elementPos, 1);

			this.companiesChanged.emit(this.companies);
		}
	}

	setUniqueIndustries(industries) {
		this.industries = industries;
	}

	getUniqueIndustries() {
		return this.industries;
	}

	setFilter(filterArray) {
		this.filterChanged.emit(filterArray);
	}

	queryChanged(queryString) {
		this.queryStringChanged.emit(queryString);
	}

	setSelectedCompany(company) {
		this.companySelected = company;
	}

	getSelectedCompany() {
		return this.companySelected;
	}

	removeSelectedCompany() {
		this.companySelected = null;
	}
}
