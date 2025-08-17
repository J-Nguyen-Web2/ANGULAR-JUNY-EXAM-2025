import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterBoard } from './character-board';

describe('CharacterBoard', () => {
  let component: CharacterBoard;
  let fixture: ComponentFixture<CharacterBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
