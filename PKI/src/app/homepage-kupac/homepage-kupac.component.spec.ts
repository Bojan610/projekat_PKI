import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageKupacComponent } from './homepage-kupac.component';

describe('HomepageKupacComponent', () => {
  let component: HomepageKupacComponent;
  let fixture: ComponentFixture<HomepageKupacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageKupacComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageKupacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
