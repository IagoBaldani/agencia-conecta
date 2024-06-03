import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarVisualizarInfluenciadorComponent } from './cadastrar-visualizar-influenciador.component';

describe('CadastrarVisualizarInfluenciadorComponent', () => {
  let component: CadastrarVisualizarInfluenciadorComponent;
  let fixture: ComponentFixture<CadastrarVisualizarInfluenciadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarVisualizarInfluenciadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastrarVisualizarInfluenciadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
