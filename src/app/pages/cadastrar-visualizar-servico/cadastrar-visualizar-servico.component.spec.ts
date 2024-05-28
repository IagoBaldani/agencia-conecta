import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarVisualizarServicoComponent } from './cadastrar-visualizar-servico.component';

describe('CadastrarVisualizarServicoComponent', () => {
  let component: CadastrarVisualizarServicoComponent;
  let fixture: ComponentFixture<CadastrarVisualizarServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarVisualizarServicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastrarVisualizarServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
