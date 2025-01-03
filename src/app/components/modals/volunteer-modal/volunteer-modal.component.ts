import { Component } from '@angular/core';

@Component({
  selector: 'app-volunteer-modal',
  imports: [],
  templateUrl: './volunteer-modal.component.html',
  styleUrl: './volunteer-modal.component.css'
})
export class VolunteerModalComponent {

  isOpen = false;

  open(): void {
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }

}
