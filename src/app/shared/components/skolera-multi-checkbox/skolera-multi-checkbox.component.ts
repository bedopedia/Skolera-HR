import { Component, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';

@Component({
    selector: 'skolera-multi-checkbox',
    templateUrl: './skolera-multi-checkbox.component.html',
    styleUrls: ['./skolera-multi-checkbox.component.scss']
})
export class SkoleraMultiCheckboxComponent implements AfterContentInit {

    @Input() isParent = false;
    @Input() partiallyChecked = false;
    @Output() partiallyCheckedChange = new EventEmitter();
    @Input() allChecked = false;
    @Output() allCheckedChange = new EventEmitter();
    @Input() cells = [];
    @Input() checkedCells = [];
    @Output() checkedCellsChange = new EventEmitter();
    @Input() id = null;

    constructor() { }

    ngAfterContentInit() {
        setTimeout(() => {
            this.checkIfAllChecked();
        }, 0);
    }

    checkIfAllChecked() {
        let allChecked = true, partiallyChecked = false;
        this.cells.forEach(cell => {
            if(!this.checkedCells.includes(cell)) {
                allChecked = false;
            } else {
                partiallyChecked = true;
            }
        });
        this.allChecked = allChecked;
        this.partiallyChecked = partiallyChecked && !this.allChecked;
        this.partiallyCheckedChange.emit(this.partiallyChecked);
        this.allCheckedChange.emit(this.allChecked);
    }

    checkAll(event) {
        for (let i = 0; i < this.cells.length; i++) {
            this.checkCell(event, this.cells[i], false, event);
        }
    }
    checkCell(event, id, loop = true, allChecked = true) {
        if (event && !this.checkedCells.includes(id)) this.checkedCells.push(id);
        if (!event) this.checkedCells.splice(this.checkedCells.indexOf(id), 1);
        let partiallyChecked = false;
        if(loop) {
            this.cells.forEach(cell => {
                if(!this.checkedCells.includes(cell)) {
                    allChecked = false;
                } else {
                    partiallyChecked = true;
                }
            });
        }
        this.allChecked = allChecked;
        this.partiallyChecked = partiallyChecked && !this.allChecked;
        this.checkedCellsChange.emit(this.checkedCells);
        this.partiallyCheckedChange.emit(this.partiallyChecked);
        this.allCheckedChange.emit(this.allChecked);
    }

}
