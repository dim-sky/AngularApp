import { Injectable } from "@angular/core";
import { createEventRequest } from "../models/createEvent/createEvent.Request";
import { addHours } from "date-fns";



@Injectable({
    providedIn: 'root'
})
export class eventService{

    private events = [{
        title: 'New Event',
        start: new Date(),
        end: addHours(new Date(), 1),
        color: { primary: '#ad2121', secondary: '#FAE3E3' },
        derscription: 'temp',
        eventLocation: 'temp',
        eventMaxNumberOfPeople: 2

        },
        {
          title: 'New Event_2',
          start: new Date(),
          end: addHours(new Date(), 1),
          color: { primary: '#ad2121', secondary: '#FAE3E3' },
          },
      ];


    setEvents(data: any){
        this.events = [...data]
    }

    getEvents(){
        return this.events;
    }

    
    addEvent(event: createEventRequest){
        const newEvent = {
            title: event.eventName,
            start: new Date(event.eventDate),
            end: addHours(new Date(event.eventDate), 2),
            color: { primary: '#ad2121', secondary: '#FAE3E3' },
            derscription: event.eventDescription,
            eventLocation: event.eventLocation,
            eventMaxNumberOfPeople: 2
        }
        console.log('New Event Created');
        console.log(newEvent);
        this.events = [...this.events, newEvent]; 
        // this.events.push(newEvent);
        console.log(this.events);
        
    }

    



}