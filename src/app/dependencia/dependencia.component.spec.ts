import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenciaComponent } from './dependencia.component';

describe('DependenciaComponent', () => {
  let component: DependenciaComponent;
  let fixture: ComponentFixture<DependenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
