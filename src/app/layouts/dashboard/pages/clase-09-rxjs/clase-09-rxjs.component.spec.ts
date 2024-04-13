import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Clase09RxjsComponent } from './clase-09-rxjs.component';

describe('Clase09RxjsComponent', () => {
  let component: Clase09RxjsComponent;
  let fixture: ComponentFixture<Clase09RxjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Clase09RxjsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Clase09RxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
