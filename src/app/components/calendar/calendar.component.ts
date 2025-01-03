import { Component } from '@angular/core';
import { CalendarModule } from 'angular-calendar';

import { OrganizerModalComponent } from '../modals/organizer-modal/organizer-modal.component';
import { VolunteerModalComponent } from '../modals/volunteer-modal/volunteer-modal.component';
import { UserService } from '../../services/userService';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { eventService } from '../../services/eventService';

import { addHours } from 'date-fns';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
   today = new Date();


  view: string = 'month';
  viewDate: Date = new Date();
  events: any[];

   // Disable all days before today
   dayModifier(date: Date): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to midnight for comparison

    // Disable days before today
    return date < today ? 'disabled-day' : '';
  }

  constructor(private userService: UserService, private dialog: MatDialog, private eventService: eventService){
    this.today.setHours(0, 0, 0, 0);
    this.events = this.eventService.getEvents();
  }

  onDayClicked(dataFromCLick: any): void {
     if (dataFromCLick.day.date < this.today){
      alert("Η ημερομηνία που επιλέξατε δεν είναι έγκυρη. Επιλλέξτε μελλοντική ημερομηνία")
      return;
     }
    alert("Date Clicked");
    console.log(dataFromCLick);
    
    if (this.userService.isOrganization())
      this.openOrgModal(dataFromCLick.day.date) 

  }


  openOrgModal(datePicked: Date) {
    const dialogRef = this.dialog.open(OrganizerModalComponent, {
      width: '550px',
      height: '550px',
      // other configuration options
      data: { 
        date: datePicked
       }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.events = this.eventService.getEvents();
      console.log('Modal closed with result:', result);
    });
  }

  onEventClicked({ event }: { event: CalendarEvent }): void {
    alert(`Event clicked: ${event.title}`);
    console.log('Event details:', event);
    // Additional logic, such as opening a modal or navigating to a detail page
  }

  
  

}