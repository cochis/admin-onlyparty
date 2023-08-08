import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearCatalogoPage } from './crear-catalogo.page';

describe('CrearCatalogoPage', () => {
  let component: CrearCatalogoPage;
  let fixture: ComponentFixture<CrearCatalogoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrearCatalogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
