import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeTableDemoComponent } from './tree-table-demo.component';

describe('TreeTableDemoComponent', () => {
  let component: TreeTableDemoComponent;
  let fixture: ComponentFixture<TreeTableDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeTableDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeTableDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
