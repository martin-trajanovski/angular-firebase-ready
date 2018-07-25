export class Company {
	public _id: string;
	public isActive: boolean;
	public company: string;
	public about: string;
	public logo: string;
	public industry: string;
	public projects: Array<Object>;

	constructor(
		_id: string,
		isActive: boolean,
		company: string,
		about: string,
		logo: string,
		industry: string,
		projects: Array<Object>) {
			this._id = _id;
			this.isActive = isActive;
			this.company = company;
			this.about = about;
			this.logo = logo;
			this.industry = industry;
			this.projects = projects;
	}
}
