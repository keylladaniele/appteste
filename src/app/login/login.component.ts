import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
 import { HttpClient } from '@angular/common/http';
 import { Router } from '@angular/router';
 import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  
  email: string;
  password: string;
  loginForm: FormGroup;
  result: any;

  constructor(
     private formBuilder : FormBuilder,
     private http: HttpClient,    
     private router: Router
  ) {   }

  ngOnInit(): void {
     this.loginForm = this.formBuilder.group({
         email:[''],
         password:['']
       })
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
  }

 login() {
     this.http.get<any>("http://localhost:3000/users").subscribe(res => {
       const user = res.find((a:any) => {
         return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
       }); 
       if(user) {
         alert("Login feito com sucesso")
        this.router.navigate(['dashboard'])
         this.loginForm.reset();
       }
       else {
         alert("Falha! Usuário não encontrado!")
       }
     })
   }

}
