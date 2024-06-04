import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMobileFullscreenComponent } from './menu-mobile-fullscreen.component';

describe('MenuMobileFullscreenComponent', () => {
  let component: MenuMobileFullscreenComponent;
  let fixture: ComponentFixture<MenuMobileFullscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuMobileFullscreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuMobileFullscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
