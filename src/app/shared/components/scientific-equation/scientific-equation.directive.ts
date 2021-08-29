import { Directive, OnInit, OnChanges, OnDestroy, Input, ElementRef, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ScientificEquationService } from './scientific-equation.service';

@Directive({
    selector: '[scientificEquation]'
  })
  export class ScientificEquationDirective implements OnInit, OnDestroy {
    private alive$ = new Subject<boolean>();
  
    @Input()
    private scientificEquation: string;
    private readonly _el: HTMLElement;
  
    constructor(private service: ScientificEquationService,
                private el: ElementRef) {
      this._el = el.nativeElement as HTMLElement;
    }
  
    ngOnInit(): void {
      this.service
        .ready()
        .pipe(
          take(1),
          takeUntil(this.alive$)
        ).subscribe(res => {
          this.service.render(this._el, this.scientificEquation);
      });
    }
  
    ngOnChanges(changes: SimpleChanges): void {
        this.service.render(this._el, this.scientificEquation);
      }

    ngOnDestroy(): void {
      this.alive$.next(false);
    }
  }