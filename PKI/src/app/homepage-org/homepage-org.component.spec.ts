import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageOrgComponent } from './homepage-org.component';

describe('HomepageOrgComponent', () => {
  let component: HomepageOrgComponent;
  let fixture: ComponentFixture<HomepageOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageOrgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
