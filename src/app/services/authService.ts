import { Injectable } from "@angular/core";
import { jwtDecode } from 'jwt-decode';



@Injectable({
    providedIn: 'root'
})
export class AuthService{


    getRoleFromToken(token: string): string | undefined | null {
       
        try {
            const decodedToken: any = jwtDecode(token);
            console.log(decodedToken);
            return decodedToken.role; // Replace 'role' with the actual claim key in your JWT
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

}
