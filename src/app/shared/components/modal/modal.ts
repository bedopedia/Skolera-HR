import { Component, ElementRef, Input, OnInit, OnDestroy, HostListener } from '@angular/core';

import { ModalService } from '@shared/services';
import { ScientificEquationService } from '@shared/components/scientific-equation/scientific-equation.service';

@Component({
    selector: 'skolera-modal',
    template: '<ng-content></ng-content>'
})

export class ModalComponent implements OnInit, OnDestroy {
    @Input() id: string;
    private element: any;

    constructor(
        private modalService: ModalService, private el: ElementRef
    ) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        let modal = this;

        // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', function (ev: any) {
            if (ev.target.classList.contains('close-modal') || ev.target.classList.contains('modal-background')) {
                modal.close();
            }
        });
        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
    }

    // remove self from modal service when directive is destroyed
    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        this.element.style.display = 'flex';
        this.element.classList.add('skolera-modal-active');
        document.body.classList.add('skolera-modal-open');
    }

    // close modal
    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('skolera-modal-open');
    }
    @HostListener("document:keydown", ["$event"])
    onkeypress(ev) {
        // if (ev.keyCode === 27) {
        //     this.close();
        // }
    }
    @HostListener("document:click", ["$event"])
    onDocumentClicked(ev) {
        if (ev.target.classList.contains('open-modal')) {
            this.modalService.open(ev.target.getAttribute('data-target'));
        } else if (ev.target.closest('.open-modal')){
            this.modalService.open(ev.target.closest('.open-modal').getAttribute('data-target'));
        }
    }
}