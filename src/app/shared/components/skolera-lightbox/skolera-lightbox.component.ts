import { Component, Injectable, Input, OnInit, HostListener } from '@angular/core';

@Injectable()
@Component({
    selector: '[skolera-lightbox]',
    template: `
        <span (click)="openLightbox()">
            <ng-content></ng-content>
        </span>
        <div class="skolera-lightbox-container" *ngIf="lightboxOpen">
            <div class="skolera-lightbox-wrapper">
                <img [src]="lightboxSrc" />
            </div>
            <div (click)="closeLightbox()" class="skolera-lightbox-background"></div>
        </div>
    `,
    styleUrls: ['./skolera-lightbox.component.scss']
})

export class SkoleraLightboxComponent implements OnInit {
    @Input() lightboxSrc;
    lightboxOpen: boolean = false;
    openLightbox() {
        this.lightboxOpen = true;
        document.body.classList.add('overflow-hidden');
    }
    closeLightbox() {
        this.lightboxOpen = false;
        document.body.classList.remove('overflow-hidden');
    }
    ngOnInit() {

    }
    ngOnDestroy() {

    }
    constructor(
    ) { }
}
