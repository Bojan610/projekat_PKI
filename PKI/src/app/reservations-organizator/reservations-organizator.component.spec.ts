import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsOrganizatorComponent } from './reservations-organizator.component';

describe('ReservationsOrganizatorComponent', () => {
  let component: ReservationsOrganizatorComponent;
  let fixture: ComponentFixture<ReservationsOrganizatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationsOrganizatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsOrganizatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
