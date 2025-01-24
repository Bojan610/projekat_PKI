import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderKupacComponent } from './header-kupac.component';

describe('HeaderKupacComponent', () => {
  let component: HeaderKupacComponent;
  let fixture: ComponentFixture<HeaderKupacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderKupacComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderKupacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
