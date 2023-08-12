import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProducOperationstComponent } from './product-operations.component';


describe('ProducOperationstComponent', () => {
  let component: ProducOperationstComponent;
  let fixture: ComponentFixture<ProducOperationstComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProducOperationstComponent]
    });
    fixture = TestBed.createComponent(ProducOperationstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
