import { Component } from '@angular/core';

import { NavigationService } from '../../services/navigationService';

@Component({
  selector: 'app-un-authenticated-user',
  imports: [],
  templateUrl: './un-authenticated-user.component.html',
  styleUrl: './un-authenticated-user.component.css'
})
export class UnAuthenticatedUserComponent {
  message: string = "Ο λογαριασμός σας δεν έχει εγκριθεί ακόμα. Ένας διαχειριστής θα εξετάσει το αίτημά σας. Παρακαλώ προσπαθήστε ξανά αργότερα";

  constructor(private navigationService: NavigationService){}

  goBack(){
    this.navigationService.goToLoginPage()
  }


}
