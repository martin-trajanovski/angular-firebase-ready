import { Component, OnInit } from '@angular/core';
import { CompaniesListService } from '../companies-list/companies-list.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
	selector: 'afr-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	private industries: Array<string> = [];
	private selectedIndustries: Array<string> = [];
	navbarExpanded = false;
	queryString: string;
	showMenu = true;

	constructor(private CompaniesService: CompaniesListService, private router: Router) { }

	ngOnInit() {
		this.router.events.subscribe((url: any) => {
			if (url instanceof NavigationEnd && url.url.indexOf('/company/') !== -1) {
				this.showMenu = false;
			} else {
				this.showMenu = true;
			}
		});
	}

	getIndustries() {
		this.industries = this.CompaniesService.getUniqueIndustries();
	}

	selectIndustry(industry) {
		if (this.selectedIndustries.indexOf(industry) === -1) {
			this.selectedIndustries.push(industry);
		} else {
			this.selectedIndustries.splice(this.selectedIndustries.indexOf(industry), 1);
		}

		this.CompaniesService.setFilter(this.selectedIndustries);
	}

	onSearch() {
		this.CompaniesService.queryChanged(this.queryString);
	}

	toggleNavigation() {
		this.navbarExpanded = !this.navbarExpanded;
	}

}
