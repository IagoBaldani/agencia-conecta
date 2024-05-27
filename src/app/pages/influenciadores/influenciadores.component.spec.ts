import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluenciadoresComponent } from './influenciadores.component';

describe('InfluenciadoresComponent', () => {
  let component: InfluenciadoresComponent;
  let fixture: ComponentFixture<InfluenciadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfluenciadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfluenciadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
