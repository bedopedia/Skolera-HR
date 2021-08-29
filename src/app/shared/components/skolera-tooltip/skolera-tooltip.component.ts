import { Component, ElementRef, Input, OnInit, OnDestroy, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { ScientificEquationService } from '../scientific-equation/scientific-equation.service';

@Component({
    selector: '[skolera-tooltip]',
    template: `
        <ng-content></ng-content>
        <div class="skolera-tooltip" #skoleraTooltip>
            <div class="skolera-tooltip-container" *ngIf="isString" [scientificEquation]="tooltipContent">
            </div>
            <div class="skolera-tooltip-container" *ngIf="!isString">
                <ng-container  [ngTemplateOutlet]="tooltipContent" [ngTemplateOutletContext]=tooltipInput></ng-container>
            </div>
        </div>
    `,
    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()',
        '(click)': 'onMouseClick()',
        '[class]': 'class'
    },
    styleUrls: ['./skolera-tooltip.component.scss']
})

export class SkoleraTooltipComponent implements OnInit, OnDestroy {
    @Input() tooltipContent: any;
    @Input() tooltipInput = '';
    @Input() onClick = false;
    @ViewChild('skoleraTooltip') skoleraTooltip: ElementRef;
    @Input() class;
    constructor(public el: ElementRef,
        private scientificEquationService: ScientificEquationService
        ) {
            scientificEquationService.addHTMLHeadConfigurations(); 
        }
    mouseEnter = false;
    isString = false;
    ngOnInit() {
        this.isString = typeof this.tooltipContent == 'string'? true : false;
        this.class? this.class += ' skolera-tooltip-container' : this.class = 'skolera-tooltip-container';
    }
    ngOnDestroy() {
        this.destroyTooltip();
    }
    onMouseEnter() {
        if(this.onClick) return;
        this.mouseEnter = true;
        document.body.appendChild(this.skoleraTooltip.nativeElement)
        this.updatePosition();
    }
    onMouseClick() {
        this.mouseEnter = true;
        document.body.appendChild(this.skoleraTooltip.nativeElement)
        this.updatePosition();
    }
    onMouseLeave() {
        if(this.onClick) return;
        this.destroyTooltip();
    }
    @HostListener('window:scroll', ['$event'])
    onWindowScroll($event) {
        this.updatePosition();
    }
    @HostListener('window:click', ['$event'])
    onWindowClick($event) {
        if($event.target === this.el.nativeElement || $event.target.closest('.skolera-tooltip-container') === this.el.nativeElement) return;
        this.destroyTooltip();
    }
    destroyTooltip() {
        this.mouseEnter = false;
        this.updatePosition();
        this.skoleraTooltip.nativeElement.remove();
    }
    updatePosition(){
        if (this.mouseEnter){
            this.skoleraTooltip.nativeElement.style.top = (this.el.nativeElement.getBoundingClientRect().y + 10 + this.el.nativeElement.getBoundingClientRect().height - document.body.scrollTop) + 'px';
            let leftPos = document.querySelector('body').getAttribute('dir') == 'rtl' ? this.el.nativeElement.getBoundingClientRect().x : this.el.nativeElement.getBoundingClientRect().x + this.el.nativeElement.getBoundingClientRect().width - this.skoleraTooltip.nativeElement.getBoundingClientRect().width;
            this.skoleraTooltip.nativeElement.style.left = leftPos + 'px';
            this.fitMenu();
        }else {
            this.skoleraTooltip.nativeElement.style.top = '-10000px'
            this.skoleraTooltip.nativeElement.style.left = '-10000px'
        }
    }
    fitMenu() {
        this.skoleraTooltip.nativeElement.classList.remove('tooltip-reverse-v');
        let offsetAndHeight = this.skoleraTooltip.nativeElement.getBoundingClientRect().height + this.skoleraTooltip.nativeElement.getBoundingClientRect().y;
        let widnowHeight = window.innerHeight;
        let outOfWindowVertically = offsetAndHeight - widnowHeight > 0 ? true : false;
        if (outOfWindowVertically) {
            this.skoleraTooltip.nativeElement.classList.add('tooltip-reverse-v')
            this.skoleraTooltip.nativeElement.style.maxHeight = (offsetAndHeight - 20) + 'px'
            this.skoleraTooltip.nativeElement.style.top = (this.el.nativeElement.getBoundingClientRect().y - 10 - this.skoleraTooltip.nativeElement.getBoundingClientRect().height - document.body.scrollTop) + 'px';

        }
    }
}
