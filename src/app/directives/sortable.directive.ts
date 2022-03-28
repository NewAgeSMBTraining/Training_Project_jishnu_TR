import { Directive,Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: 'asc', '': 'asc' };

export class SortEvent {
  column: string;
  direction: SortDirection;

  constructor(sort: {column: any, direction: any}) {
    sort = sort || {};
    this.column = sort?.column || '';
    this.direction = sort?.direction || '';
  }

  sort(): string[] {
    const c = this.column.split('.');
    c.push(this.direction);
    return c;
  }
}

@Directive({
  selector: '[appSortable]'
})
export class SortableDirective {

  @Input('appSortable')
  sortable!: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  @HostListener('click') onClick() {
    this.rotate();
  }

  constructor(private el: ElementRef) { }

  clear() {
    this.direction = '';
    this.el.nativeElement.classList.remove('asc', 'desc');
  }

  rotate() {
    this.direction = rotate[this.direction];
    if (this.direction === 'asc') {
      this.el.nativeElement.classList.add('asc');
    } else {
      this.el.nativeElement.classList.remove('asc');
    }
    if (this.direction === 'desc') {
      this.el.nativeElement.classList.add('desc');
    } else {
      this.el.nativeElement.classList.remove('desc');
    }
    this.sort.emit(new SortEvent({ column: this.sortable, direction: this.direction}));
  }

}
