import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventChangePopupComponent } from './event-change-popup.component';

describe('EventChangePopupComponent', () => {
  let component: EventChangePopupComponent;
  let fixture: ComponentFixture<EventChangePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventChangePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventChangePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
