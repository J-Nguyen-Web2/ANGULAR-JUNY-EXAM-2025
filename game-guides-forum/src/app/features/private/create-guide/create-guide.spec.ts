import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGuide } from './create-guide';

describe('CreateGuide', () => {
  let component: CreateGuide;
  let fixture: ComponentFixture<CreateGuide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGuide]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateGuide);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
