import { Component, OnInit ,ElementRef} from '@angular/core';
import { UserServiceService } from '../../user-service.service';
import {SnotifyService} from 'ng-snotify';
import { SocketServiceService } from '../../socket-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public userService:UserServiceService,public snortify:SnotifyService, public socketService:SocketServiceService ,private elementRef: ElementRef) {}

  ngOnInit() {

    this.elementRef.nativeElement.ownerDocument.body.style.background="url('../../../assets/background.jpg') no-repeat center center fixed";
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundSize="cover";
  } 


  public firstName;
  public  lastName;
  public email;
  public password;
  public mobileNumber;
  public countryCode;


//Method to process signup
  public signUp = () =>{

    if(!this.firstName){
      this.snortify.error('Please add First Name');
    }else if(!this.lastName){
      this.snortify.error('Please add Last Name')
    }else if(!this.validateEmail(this.email)){
      this.snortify.error('Invalid Email')
    }else if(!this.CheckPassword(this.password)){
      this.snortify.error('Your password must be between 7 to 15 characters which contain at least one digit and a special character.')
    }else if(!this.countryCode){
      this.snortify.error('Country Code missing')
    }else if(!this.phonenumberCheck(this.mobileNumber)){
      this.snortify.error('Invalid Mobile Number')
    }else{

    let signupDetails = {

      firstName:this.firstName,
      lastName:this.lastName,
      email:this.email,
      password:this.password,
      mobileNumber:this.mobileNumber,
      countryCode:this.countryCode
    }

    this.userService.signUpFunction(signupDetails).subscribe((response)=>{
      if(response.status === 200){
        let mailDetails = {
          receiver:response.data.email,
          subject:'Welcome to Expensesplitz',
          html:`<p>Hi,</p><br><p>Thank you for joining Expensesplitz, start adding friends and spliting expenses.</p><br><p>Regards: </p><p>Expensesplitz Team</p>`
        }
    
        this.socketService.sendMail(mailDetails);
        this.snortify.success('Signed-up successfully');
        window.location.assign('/login')
      }else{
        this.snortify.error(response.message);
      }

    },((err)=>{
     this.snortify.error('user already exists, try login') 
    }))

  } //  end of signup function
}
//end of signup



//Method to validate email
public validateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
} // end of email validation


//Method to check password using regex
public CheckPassword(inputtxt) 
{ 
if(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(inputtxt)) 
{ 
return true;
}
else
{ 
return false;
}
} // end of password validation


//Method to check phone number
public phonenumberCheck(inputtxt)
{
  var phoneno = /^\d{10}$/;
  if((/^\d{10}$/.test(inputtxt)))
        {
      return true;
        }
      else
        {
        return false;
        }
} // end of phone number check


} 
