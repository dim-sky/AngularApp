import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerModalComponent } from './organizer-modal.component';

describe('OrganizerModalComponent', () => {
  let component: OrganizerModalComponent;
  let fixture: ComponentFixture<OrganizerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
