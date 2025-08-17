import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideContent } from './guide-content';

describe('GuideContent', () => {
  let component: GuideContent;
  let fixture: ComponentFixture<GuideContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuideContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
