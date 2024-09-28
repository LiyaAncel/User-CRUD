import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  users:any 

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData():any {
    this.api.getAllUsers().subscribe((res)=>{
      console.log(res)
      this.users = res.data
    })
  }

  deleteUser(id:any){
    this.api.deleteUser(id).subscribe((res)=>{
      console.log(res, 'deleted')
      this. getAllData();
    })
  }

}
