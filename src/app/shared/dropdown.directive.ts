import { Directive, Renderer2, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
	selector: '[fovDropdown]'
})
export class DropdownDirective {
	isOpen = false;

	constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

	@HostListener('click') onDropdownToggle() {
		this.isOpen = !this.isOpen;
		const dropdownMenu: HTMLElement = this.elementRef.nativeElement.querySelector('.dropdown-menu');

		if (this.isOpen) {
			this.renderer.addClass(this.elementRef.nativeElement, 'show');

			dropdownMenu.classList.add('show');
		} else {
			this.renderer.removeClass(this.elementRef.nativeElement, 'show');

			dropdownMenu.classList.remove('show');
		}
	}
}
