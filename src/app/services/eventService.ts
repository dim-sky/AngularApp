import { Injectable } from "@angular/core";
import { createEventRequest } from "../models/createEvent/createEvent.Request";
import { addHours } from "date-fns";



@Injectable({
    providedIn: 'root'
})
export class eventService{

    private events: any = [];


    setEvents(data: any){
        this.events = [...data]
    }

    getEvents(){
        return this.events;
    }

    
    transformEvents(events: Array<createEventRequest>){
        const newEvents: any = []

        events.forEach((event) => {
            const newEvent = {
                title: event.eventName,
                start: new Date(event.eventDate),
                end: addHours(new Date(event.eventDate), 2),
                color: { primary: '#ad2121', secondary: '#FAE3E3' },
                derscription: event.eventDescription,
                eventLocation: event.eventLocation,
                eventMaxNumberOfPeople: 2
            }
            newEvents.push(newEvent);

        })
        return newEvents;
    }

    addOwnEvent(event: createEventRequest){
        const newEvent = {
            title: event.eventName,
            start: new Date(event.eventDate),
            end: addHours(new Date(event.eventDate), 2),
            color: { primary: '#0000FF', secondary: '#ADD8E6' }, 
            derscription: event.eventDescription,
            eventLocation: event.eventLocation,
            eventMaxNumberOfPeople: 2
        }
        // console.log("addEvent ---- eventService: this.events: ");
        // console.log(this.events);
        this.events = [...this.events, newEvent];    
        // console.log("after the push");
        // console.log(this.events);
    }

    



}