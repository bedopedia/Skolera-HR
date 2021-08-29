import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-scroll-full-table',
  templateUrl: './scroll-full-table.component.html',
  styleUrls: ['./scroll-full-table.component.scss']
})
export class ScrollFullTableComponent implements OnInit {
fullscreenEnabled = false;
bodyWrapper;
@Output() fullscreen = new EventEmitter();
@Input() disableFullScreen = false;

  constructor() { }

  ngOnInit() {
    this.bodyWrapper = document.getElementById('table-container');
  }

  GradebookScrollPrev() {
    this.bodyWrapper.scrollLeft -= (100 + this.bodyWrapper.scrollLeft % 100);
  }

  GradebookScrollNext() {
    this.bodyWrapper.scrollLeft += (100 - this.bodyWrapper.scrollLeft % 100);
  }
  
  fullScreen() {
    this.fullscreenEnabled = ! this.fullscreenEnabled;
    this.fullscreen.emit(this.fullscreenEnabled);
  }

}
