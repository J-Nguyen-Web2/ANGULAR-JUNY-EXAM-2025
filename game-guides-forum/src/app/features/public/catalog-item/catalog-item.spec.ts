import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogItem } from './catalog-item';

describe('CatalogItem', () => {
  let component: CatalogItem;
  let fixture: ComponentFixture<CatalogItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
