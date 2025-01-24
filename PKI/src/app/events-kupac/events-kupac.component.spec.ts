import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsKupacComponent } from './events-kupac.component';

describe('EventsKupacComponent', () => {
  let component: EventsKupacComponent;
  let fixture: ComponentFixture<EventsKupacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsKupacComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsKupacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
