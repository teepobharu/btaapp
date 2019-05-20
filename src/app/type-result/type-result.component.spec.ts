import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeResultComponent } from './type-result.component';

describe('TypeResultComponent', () => {
  let component: TypeResultComponent;
  let fixture: ComponentFixture<TypeResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
