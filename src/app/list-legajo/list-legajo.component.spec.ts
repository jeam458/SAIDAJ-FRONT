import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLegajoComponent } from './list-legajo.component';

describe('ListLegajoComponent', () => {
  let component: ListLegajoComponent;
  let fixture: ComponentFixture<ListLegajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLegajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLegajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
