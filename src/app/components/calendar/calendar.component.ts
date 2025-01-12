import { Component } from '@angular/core';
import { CalendarModule } from 'angular-calendar';

import { OrganizerModalComponent } from '../modals/organizer-modal/organizer-modal.component';
import { VolunteerModalComponent } from '../modals/volunteer-modal/volunteer-modal.component';
import { UserService } from '../../services/userService';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { eventService } from '../../services/eventService';
import { MyHttpService } from '../../services/MyHttpService';

import { addHours } from 'date-fns';
import { response } from 'express';
import { error } from 'console';

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

  constructor(private userService: UserService, private dialog: MatDialog, private eventService: eventService, private myHttp: MyHttpService){
    this.getAllEvents();
    this.today.setHours(0, 0, 0, 0);
    this.events = this.eventService.getEvents();
  }

  onDayClicked(dataFromCLick: any): void {
     if (dataFromCLick.day.date < this.today && this.userService.isOrganization()){
      alert("Η ημερομηνία που επιλέξατε δεν είναι έγκυρη. Επιλλέξτε μελλοντική ημερομηνία")
      return;
     }
    // alert("Date Clicked");
    // console.log(dataFromCLick);
    

    if (this.userService.isOrganization())
      this.openOrgModal(dataFromCLick.day.date, false, null) 
    }

  onEventClicked({ event }: { event: CalendarEvent }): void {
    this.openOrgModal(new Date(), true, event) 
    console.log('Event details:', true);
    console.log(event)
    // Additional logic, such as opening a modal or navigating to a detail page
  }


  openOrgModal(datePicked: Date, eventClicked: boolean, eventData: CalendarEvent | null) {
    const dialogRef = this.dialog.open(OrganizerModalComponent, {
      width: '550px',
      height: '550px',
      // other configuration options
      data: { 
        date: datePicked,
        eventClicked: eventClicked,
        eventData: eventData
       }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.events = this.eventService.getEvents();
      console.log('Modal closed with result:', result);
    });
  }

  getAllEvents(){
    if (this.userService.isVolunteer()){
      this.myHttp.getAllEvents().subscribe((response) => {
        this.events = this.eventService.transformEvents(response);
      }, (error) => {
        console.log(error);
      })
    }
  }

  
  

}