import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsKupacComponent } from './event-details-kupac.component';

describe('EventDetailsKupacComponent', () => {
  let component: EventDetailsKupacComponent;
  let fixture: ComponentFixture<EventDetailsKupacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetailsKupacComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDetailsKupacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
