import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lore } from './lore';

describe('Lore', () => {
  let component: Lore;
  let fixture: ComponentFixture<Lore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
