import { Component } from '@angular/core';
import { CalendarModule } from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  view: string = 'month';
  viewDate: Date = new Date();
  events: any[] = [];

  onDayClicked(dataFromCLick: any): void {
    alert("Date Clicked");
    console.log(dataFromCLick);
    // Handle the click event logic here, e.g., show event details, select the date, etc.
  }


}