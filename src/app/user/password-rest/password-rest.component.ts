import { Component, OnInit ,ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../user-service.service';
import { SocketServiceService } from '../../socket-service.service';
import {SnotifyService} from 'ng-snotify';
import {SnotifyPosition} from 'ng-snotify';


@Component({
  selector: 'app-password-rest',
  templateUrl: './password-rest.component.html',
  styleUrls: ['./password-rest.component.css']
})
export class PasswordRestComponent implements OnInit {

  constructor(public userService:UserServiceService,public router:Router,public socketService:SocketServiceService,public _router:ActivatedRoute,public snortify:SnotifyService,private elementRef: ElementRef) { }

  public token;
  public date = new Date();

  ngOnInit() {
    this.token = this._router.snapshot.paramMap.get('resetToken');
    this.elementRef.nativeElement.ownerDocument.body.style.background="url('../../../assets/background.jpg') no-repeat center center fixed";
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundSize="cover";

    this.getInfoUsingToken(this.token)

  }


  //Method to get user information using token
  public emailReceived;
  public getInfoUsingToken = (token) =>{
    this.userService.getInfoUsingToken(token).subscribe((response)=>{

      console.log(response)
      if(response.status==200){
      if((response.data.PasswordResetToken == this.token) && (Date.parse(`${response.data.PasswordResetExpiration}`) > Date.parse(`${this.date}`))){
        // console.log('user verified')
        this.emailReceived = response.data.email
      }else{
        alert('some error occured')
        this.router.navigate(['/login'])
      }
    }else{
      this.router.navigate(['/login'])
    }
    },((err)=>{
      this.router.navigate(['/login'])
    }))
  }
  //end of getInfoUsingToken


// Update password function
public password;
  public update = () =>{

    if(!this.emailReceived){
      this.snortify.error('Error has occured, Please try again');
    }else if(!this.CheckPassword(this.password)){
           this.snortify.create({
        title: `Check`,
        body:`Your Password must be between 7 to 15 characters which contain at least one digit and a special character.`,
        config: {
          position: SnotifyPosition.centerTop,
          type:'warning'
        }
      });
    }else{

    let details = {
      email:this.emailReceived,
      password:this.password
    }
    this.userService.updatePassword(details).subscribe((response)=>{
      if(response.status === 200){
        this.snortify.success('Password changed successfully');
        this.router.navigate(['/login'])
      }else{
        this.snortify.error(response.message);
      }
    });
    
  }
}
//end of update

//Check entered password using regex
public CheckPassword(inputtxt) { 
if(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(inputtxt)) 
{ 
return true;
}
else
{ 
return false;
}
} // end of password validation



}
