import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MyHttpService } from '../../services/MyHttpService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common'; // This provides NgIf, NgFor, etc.
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-admin-page',
  imports: [
    NavbarComponent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    CommonModule, // Provides common directives
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent {

  constructor(private myHttp: MyHttpService){}

  data: any;
  displayedColumns: string[] = ['id', 'name', 'email', 'role' ,'action'];


  ngOnInit(){
    this.myHttp.getUnAuthenticatedUsers().subscribe(
      (response) => {
        // console.log("aaaa")
        // console.log(response);
        this.data = response;
      },
      (error) => {
        console.log(error);
      });
  }

  authenticateUser(userToBeRemoved: any){
    
    this.myHttp.approveUser(userToBeRemoved.userId).subscribe(
      (response) => {
        alert("Ο χρήστης επιβεβαιώθηκε");
        this.data = this.data.filter((user: { userId: any; }) => user.userId !== userToBeRemoved.userId);
        console.log(this.data);
      },
      (error) => {
        console.log(error);
      })
  }
  




}
