import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from '../../company-card/company.model';
import { CompaniesListService } from '../companies-list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'afr-company-detail',
	templateUrl: './company-detail.component.html',
	styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit, OnDestroy {
	selectedCompanyEl: Company;
	companyDetailsLoaded = false;
	editMode = false;
	companyDetailsCopy: Company;

	constructor(
		private CompanyService: CompaniesListService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		this.getCompanyDetails();
	}

	getCompanyDetails() {
		if (!this.CompanyService.getSelectedCompany() && this.route.snapshot.params.id) {
			this.CompanyService.getCompanyById(this.route.snapshot.params.id)
			.then((result: Company) => {
				if (result) {
					this.selectedCompanyEl = new Company(
						result._id,
						result.isActive,
						result.company,
						result.about,
						result.logo || 'https://picsum.photos/500/400/?random',
						result.industry,
						result.projects
					);

					this.companyDetailsLoaded = true;
				} else {
					this.router.navigate(['/companies']);
				}
			});
		} else {
			this.selectedCompanyEl = this.CompanyService.getSelectedCompany();

			this.companyDetailsLoaded = true;
		}
	}

	enterEditMode() {
		this.companyDetailsCopy = {...this.selectedCompanyEl};
		this.editMode = true;
	}

	saveChanges() {
		this.CompanyService.saveCompanyChanges(this.selectedCompanyEl)
		.then(() => {
			this.editMode = false;
		});
	}

	removeCompany() {
		const message = confirm(`Are you sure you want to delete ${this.selectedCompanyEl.company}?`);

		if (message) {
			this.CompanyService.removeCompany(this.selectedCompanyEl)
			.then((result: Company) => {
				this.router.navigate(['/companies']);
			});
		}
	}

	cancel() {
		this.selectedCompanyEl = this.companyDetailsCopy;
		this.editMode = false;
	}

	ngOnDestroy() {
		this.CompanyService.removeSelectedCompany();
		this.selectedCompanyEl = null;
	}

}
