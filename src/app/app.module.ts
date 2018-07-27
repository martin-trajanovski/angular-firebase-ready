import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { CompanyDetailComponent } from './companies-list/company-detail/company-detail.component';
import { CompanyCardComponent } from './company-card/company-card.component';
import { FilterByNamePipe } from './shared/filter-by-name.pipe';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AddNewCompanyComponent } from './companies-list/add-new-company/add-new-company.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
	{
		path: 'company/:id',
		component: CompanyDetailComponent
	},
	{
		path: 'companies',
		component: CompaniesListComponent,
	},
	{
		path: 'add-company',
		component: AddNewCompanyComponent
	},
	{
		path: '',
		redirectTo: '/companies',
		pathMatch: 'full'
	},
	{
		path: '**',
		component: PageNotFoundComponent
	}
];

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		DropdownDirective,
		CompaniesListComponent,
		CompanyDetailComponent,
		CompanyCardComponent,
		AddNewCompanyComponent,
		FilterByNamePipe,
		PageNotFoundComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		NgProgressModule.forRoot({
			color: '#c3002f'
		}),
		NgProgressHttpModule,
		RouterModule.forRoot(
			appRoutes,
			{useHash: true}
		), ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
