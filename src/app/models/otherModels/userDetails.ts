import { EventModel } from "./eventDetails";
import { UserRole } from "./userRole";

export interface UserDetails{
    authenticated: boolean;
    email: string
    name: string
    organizedEvents: Array<EventModel>
    role: UserRole
    userId: number
    userName: string
    volunteeredEvents: Array<EventModel>

}