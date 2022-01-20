import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExpedientesComponent } from './list-expedientes.component';

describe('ListExpedientesComponent', () => {
  let component: ListExpedientesComponent;
  let fixture: ComponentFixture<ListExpedientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListExpedientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExpedientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
