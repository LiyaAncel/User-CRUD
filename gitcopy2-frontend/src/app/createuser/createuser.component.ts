import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  getId:any


  constructor(private api:ApiService, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.getId=this.router.snapshot.paramMap.get('id');
    if (this.getId){
      this.api.getSingleUser(this.getId).subscribe((res)=>{
        console.log(res, 'selected user')
        this.userForm.patchValue({
          firstname : res.data[0].firstname,
          lastname : res.data[0].lastname,
          age : res.data[0].age,
          gender : res.data[0].gender,
          email : res.data[0].email,
          phone : res.data[0].phone,
        })
      })
    }
  }

  userForm = new FormGroup({
    'firstname' : new FormControl('', Validators.required),
    'lastname': new FormControl('', Validators.required),
    'age': new FormControl('', [Validators.required, Validators.min(1)]),
    'gender': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'phone': new FormControl('', Validators.required),

  })

  createNew(){
    if (this.userForm.valid){
      console.log(this.userForm.value)
      this.api.createUser(this.userForm.value).subscribe((res)=>{
        console.log(res, 'Data added')
        this.userForm.reset();
      })
    } else {
      console.log('All fields are required')
    }

  }

  update(){
    console.log(this.userForm.value)
    if (this.userForm.valid){
      this.api.updateUser(this.userForm.value,this.getId).subscribe((res)=>{
        console.log(res,'response')
        this.userForm.reset();
      })
    } else {
      console.log('All fields are required')
    }

  }


}
