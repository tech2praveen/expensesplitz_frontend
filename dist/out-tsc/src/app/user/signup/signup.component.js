"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_service_1 = require("../../user-service.service");
var ng_snotify_1 = require("ng-snotify");
var socket_service_service_1 = require("../../socket-service.service");
var SignupComponent = /** @class */ (function () {
    function SignupComponent(userService, snortify, socketService) {
        var _this = this;
        this.userService = userService;
        this.snortify = snortify;
        this.socketService = socketService;
        this.signUp = function () {
            if (!_this.firstName) {
                _this.snortify.error('First Name missing');
            }
            else if (!_this.lastName) {
                _this.snortify.error('Last Name missing');
            }
            else if (!_this.ValidateEmail(_this.email)) {
                _this.snortify.error('invalid email');
            }
            else if (!_this.CheckPassword(_this.password)) {
                _this.snortify.error('Your password mmust be between 7 to 15 characters which contain at least one numeric digit and a special character.');
            }
            else if (!_this.countryCode) {
                _this.snortify.error('Country Code missing');
            }
            else if (!_this.phonenumberCheck(_this.mobileNumber)) {
                _this.snortify.error('invalid mobile number');
            }
            else {
                var signupDetails = {
                    firstName: _this.firstName,
                    lastName: _this.lastName,
                    email: _this.email,
                    password: _this.password,
                    mobileNumber: _this.mobileNumber,
                    countryCode: _this.countryCode
                };
                _this.userService.signUpFunction(signupDetails).subscribe(function (response) {
                    // console.log(response);
                    if (response.status === 200) {
                        var mailDetails = {
                            receiver: response.data.email,
                            subject: 'Welcome to TODO-List',
                            html: "<p>Hi,</p><br><p>Thank you for joining TODO list, we are happy to have you on board</p><br><p>Regards:</p><p>TODO-list team</p>"
                        };
                        _this.socketService.sendMail(mailDetails);
                        _this.snortify.success('Signup successfull');
                        window.location.assign('/login');
                    }
                    else {
                        _this.snortify.error(response.message);
                    }
                }, (function (err) {
                    _this.snortify.error('user already exists, try login');
                }));
            } //  end of signup function
        };
    } // end of constructor
    SignupComponent.prototype.ngOnInit = function () {
    }; // end og ng onInit
    SignupComponent.prototype.ValidateEmail = function (mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true);
        }
        // alert("You have entered an invalid email address!")
        return (false);
    }; // end of email validation
    SignupComponent.prototype.CheckPassword = function (inputtxt) {
        // var passw=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(inputtxt)) {
            return true;
        }
        else {
            return false;
        }
    }; // end of password validation
    SignupComponent.prototype.phonenumberCheck = function (inputtxt) {
        var phoneno = /^\d{10}$/;
        if ((/^\d{10}$/.test(inputtxt))) {
            return true;
        }
        else {
            return false;
        }
    }; // end of phone number check
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'app-signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.css']
        }),
        __metadata("design:paramtypes", [user_service_service_1.UserServiceService, ng_snotify_1.SnotifyService, socket_service_service_1.SocketServiceService])
    ], SignupComponent);
    return SignupComponent;
}()); // end of class signup component
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map