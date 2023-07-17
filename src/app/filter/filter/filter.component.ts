import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from "../../interfaces/Category";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Input()
  public categories!: Category[];

  @Output()
  private filterCategories: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output()
  private numberOfSelectedFilters: EventEmitter<number> = new EventEmitter<number>();

  private filteredCategories: string[] = [];
  public menuClosed = true;

  private toggleArrayItem(a: string[], v: string) {
    const i = a.indexOf(v);
    if (i === -1) {
      a.push(v);
    } else {
      a.splice(i, 1);
    }
    // reassign variable to trigger pipe
    this.filteredCategories = [...a];
    this.numberOfSelectedFilters.emit(this.filteredCategories.length);
    this.filterCategories.emit(this.filteredCategories);
  }

  public handleMoreFilters(category: Category) {
    category.show = !category.show;
  }

  public handleMenu(menuClosed: boolean) {
    this.menuClosed = menuClosed;
  }

  public selectCategory(category: string, $event: MouseEvent) {
    $event.stopPropagation();
    this.toggleArrayItem(this.filteredCategories, category);
    const e = $event.target as HTMLSpanElement;
    e.classList.toggle("selected");
  }
}
