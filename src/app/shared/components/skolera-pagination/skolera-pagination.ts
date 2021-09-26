import { Component, Injectable, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import {PaginationData} from '@core/models/skolera-interfaces.model'

@Injectable()
@Component({
    selector: 'skolera-pagination',
    template: `
        <div class="flex-space-between flex-middle flex-wrap skolera-pagination-container">
            <div class="s-pagination-info mtb-1 text-left">
                <span class="size-tiny">
                    {{'tr_showing' | translate }} {{this.paginationData.total_count > 0? perPage * (paginationData.current_page - 1) + 1 : 0}} {{'tr_to' | translate}} {{perPage * (paginationData.current_page - 1) + perPage < this.paginationData.total_count? perPage * (paginationData.current_page - 1) + perPage : this.paginationData.total_count}}  {{'tr_of' | translate}} {{this.paginationData.total_count || 0}}
                </span>
            </div>
            <div class="s-pagination mtb-1 text-right">
                <div class="pagination-btn" [class.btn-disabled]="activeCell <= 1" (click)="goPrev()">
                    {{'tr_previous' | translate}}
                </div>
                <div class="pagination-cells">
                    <span *ngIf="canGoBackward" class="pagination-cell" (click)="fastBackward()"><i class="fa fa-angle-double-left"></i></span>
                    <span 
                        *ngFor="let cell of currentCells" 
                        class="pagination-cell" 
                        [class.active]="cell == activeCell"
                        (click)="cellClicked(cell)"
                    >
                        {{cell}}
                    </span>
                    <span *ngIf="canGoForward" class="pagination-cell" (click)="fastForward()"><i class="fa fa-angle-double-right"></i></span>
                </div>
                <div class="pagination-btn" [class.btn-disabled]="!(remainingPages > 0)" (click)="goNext()">
                    {{'tr_next' | translate}}
                </div>
            </div>
        </div>
    `,
    styles: [`
        
    `]
})

export class SkoleraPagination implements OnChanges {
    @Input() paginationData: PaginationData;
    @Input() perPage: number = 0;
    @Output() paginationUpdate = new EventEmitter();
    startCell: number = 1;
    step: number = 10;
    cellsNumber: number = 0;
    activeCell: number = 1;
    canGoBackward: boolean = false;
    canGoForward: boolean = false;
    currentCells: number[] = [];
    remainingPages: number = this.step;
    isLoading: boolean = true;

    constructor() { }
    ngOnChanges(change: SimpleChanges) {
        this.activeCell = this.paginationData.current_page;
        this.updateAll();
    }

    cellClicked(cell: number) {
        this.activeCell = cell;
        this.updateAll();
        this.emitValue();
    }

    goNext() {
        if (this.remainingPages > 0) {
            this.cellClicked(this.activeCell + 1)
        }
    }

    goPrev() {
        if (this.activeCell > 1) {
            this.cellClicked(this.activeCell - 1)
        }
    }

    fastForward() {
        this.cellClicked(this.startCell + this.cellsNumber);
    }

    fastBackward() {
        this.cellClicked(this.startCell - this.step);
    }

    emitValue() {
        this.paginationUpdate.emit(this.activeCell);
    }

    updateAll() {
        this.updateRemaining();
        this.updateStartingCell();
        this.drawCells();
        this.checkFastButtons();
    }

    checkFastButtons() {
        this.canGoForward = (this.remainingPages + this.activeCell) - (this.startCell + this.cellsNumber) > 0 ? true : false;
        this.canGoBackward = this.startCell > 1 ? true : false;
    }

    drawCells() {
        this.currentCells = [];
        for (let i = 0; i < this.cellsNumber; i++) {
            this.currentCells.push(this.startCell + i);
        }
    }

    updateStartingCell() {
        if (this.activeCell < this.startCell) {
            this.startCell -= this.step;
        }
        if (this.activeCell > this.startCell - 1 + this.step) {
            this.startCell = this.startCell + this.step;
        }
    }

    updateRemaining() {
        this.remainingPages = this.paginationData.total_pages - this.activeCell;
        let remainingBlock = this.paginationData.total_pages + 1 - this.startCell;
        this.cellsNumber = remainingBlock >= this.step ? this.step : remainingBlock;
    }
}

