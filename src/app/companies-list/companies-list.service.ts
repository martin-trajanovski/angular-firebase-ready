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

	companiesApiUrl = `${environment.api}/companies`;

	getCompanies() {
		return new Promise(resolve => {
			if (this.companies && this.companies.length > 0) {
				resolve(this.companies);
			} else {
				this.http.get(this.companiesApiUrl)
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
				this.http.get(`${this.companiesApiUrl}/${id}`)
				.subscribe((result: Company) => {
					resolve(result);
				});
			}
		});
	}

	saveCompanyChanges(companyToUpdate) {
		return new Promise(resolve => {
			if (companyToUpdate && companyToUpdate._id) {
				this.http.put(`${this.companiesApiUrl}/${companyToUpdate._id}`, companyToUpdate)
				.subscribe((result: Company) => {
					const updatedCompanyIndex = this.companies.findIndex(company => company._id === result._id);

					if (updatedCompanyIndex !== -1) {
						this.companies[updatedCompanyIndex] = result;

						resolve(result);
					}
				});
			}
		});
	}

	insertCompany(companyToInsert) {
		return new Promise(resolve => {
			if (companyToInsert) {
				this.http.post(`${this.companiesApiUrl}`, companyToInsert)
				.subscribe((result: Company) => {
					this.companies.push(result); // Push the inserted company in the array!
					this.setSelectedCompany(result);

					resolve(result);
				});
			}
		});
	}

	removeCompany(companyToRemove) {
		return new Promise(resolve => {
			if (companyToRemove && companyToRemove._id) {
				this.http.delete(`${this.companiesApiUrl}/${companyToRemove._id}`)
				.subscribe((result: Company) => {
					const removedCompanyIndex = this.companies.findIndex(company => company._id === result._id);

					if (removedCompanyIndex !== -1) {
						this.companies.splice(removedCompanyIndex, 1);

						this.companiesChanged.emit(this.companies);

						this.removeSelectedCompany();

						resolve(result);
					}
				});
			}
		});
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
