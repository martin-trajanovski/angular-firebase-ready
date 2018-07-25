import { TestBed, inject } from '@angular/core/testing';

import { CompaniesListService } from './companies-list.service';

describe('CompaniesListService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [CompaniesListService]
		});
	});

	it('should be created', inject([CompaniesListService], (service: CompaniesListService) => {
		expect(service).toBeTruthy();
	}));
});
