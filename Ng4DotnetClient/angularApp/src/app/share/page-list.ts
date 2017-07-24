import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

export abstract class PageList {
  page = 0;
  size = 0;
  sort = '';

  abstract onPageLoad();

  onLazyLoad(event: LazyLoadEvent) {
    this.page = event.first;
    this.size = event.rows;
    this.onPageLoad();
  }

  sortSingle(event: any) {
    console.log('sort');
    
    console.log(event);

  }
}