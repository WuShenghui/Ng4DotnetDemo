import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

export abstract class PageList {
  skip = 0;
  take = 0;
  sort = '';

  abstract onPageLoad();

  onLazyLoad(event: LazyLoadEvent) {
    this.skip = event.first;
    this.take = event.rows;
    this.onPageLoad();
  }

  sortSingle(event: any) {
    console.log('sort');

    console.log(event);

  }
}
