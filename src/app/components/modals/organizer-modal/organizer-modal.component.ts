import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { eventService } from '../../../services/eventService';
import { createEventRequest } from '../../../models/createEvent/createEvent.Request';
import { MyHttpService } from '../../../services/MyHttpService';
import { error } from 'console';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-organizer-modal',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule],
  templateUrl: './organizer-modal.component.html',
  styleUrl: './organizer-modal.component.css'
})
export class OrganizerModalComponent {
  eventForm!: FormGroup;
  isOpen = false;
  disableFormControls = false;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: { date: Date, eventClicked: boolean, eventData: any }, private dialogRef: MatDialogRef<OrganizerModalComponent>,private fb: FormBuilder, private eventService: eventService, private myHttp: MyHttpService){
    this.createForm();
    this.fillForm();
    this.disableForm();
  }

  get f() { return this.eventForm.controls; }

  onSubmit() {
    if (this.eventForm.valid) {
      const request: createEventRequest = this.createRequest();
      
      this.myHttp.createEvent(request).subscribe((response) => {
  
        this.eventService.addOwnEvent(request);
        this.dialogRef.close(this.eventForm.value);
      }, (error) => {
        console.log(error);
      })
      
      
    }
  }

  onCancel() {
    this.dialogRef.close();
  }


  createRequest(): createEventRequest{
    return {
      eventName: this.f['eventName'].value,
      eventDescription: this.f['eventDescription'].value,
      eventLocation: this.f['eventLocation'].value,
      eventDate: this.data.date.toString(),
      eventStartTime: this.f['eventStartTime'].value,
      eventMaxNumberOfPeople: this.f['eventMaxNumberOfPeople'].value,
    
    }
  }

  createForm(){
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      eventDescription: ['', Validators.required],
      eventLocation: ['', Validators.required],
      // eventDate: ['', Validators.required],
      eventStartTime: ['', Validators.required],
      eventMaxNumberOfPeople: ['', [Validators.required, Validators.min(1)]]
    });
  }

  disableForm() {
    console.log('About to disable form');
    console.log(this.data.eventClicked);
    if (this.data.eventClicked){
      this.eventForm.get('eventName')?.disable();
      this.eventForm.get('eventDescription')?.disable();
      this.eventForm.get('eventLocation')?.disable();
      this.eventForm.get('eventStartTime')?.disable();
      this.eventForm.get('eventMaxNumberOfPeople')?.disable(); 
      this.disableFormControls = true;
    }
  }

  fillForm(){
    if (this.data.eventData){
      const events = this.eventService.getEvents();
      const foundEvent = events.find((event: any) => event.title === this.data.eventData.title);

      this.eventForm.get('eventName')?.setValue(foundEvent.title);
      this.eventForm.get('eventDescription')?.setValue(foundEvent.derscription);
      this.eventForm.get('eventLocation')?.setValue(foundEvent.eventLocation);
      this.eventForm.get('eventStartTime')?.setValue(foundEvent.eventStartTime);
      this.eventForm.get('eventMaxNumberOfPeople')?.setValue(foundEvent.eventMaxNumberOfPeople); 
    }
  }



  

}
