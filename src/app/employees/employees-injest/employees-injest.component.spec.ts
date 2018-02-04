import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesInjestComponent } from './employees-injest.component';

describe('EmployeesInjestComponent', () => {
  let component: EmployeesInjestComponent;
  let fixture: ComponentFixture<EmployeesInjestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesInjestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesInjestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
