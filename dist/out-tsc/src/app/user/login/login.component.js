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
var ng2_cookies_1 = require("ng2-cookies/ng2-cookies");
var shortid = require('shortid');
var ng_snotify_1 = require("ng-snotify");
var ng_snotify_2 = require("ng-snotify");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(userService, snortify) {
        var _this = this;
        this.userService = userService;
        this.snortify = snortify;
        this.login = function () {
            if (!_this.email) {
                _this.snortify.error('Enter Email');
            }
            else if (!_this.password) {
                _this.snortify.error('enter password');
            }
            else {
                var loginDetails = {
                    email: _this.email,
                    password: _this.password
                };
                _this.userService.loginFunction(loginDetails).subscribe(function (response) {
                    if (response.status === 200) {
                        _this.snortify.success('Login successfull');
                        ng2_cookies_1.Cookie.set('authToken', response.data.authToken);
                        _this.userService.setUserInfoInLocalStorage(response.data.userDetails);
                        window.location.assign("/todo/" + response.data.userDetails.userId);
                    }
                    else {
                        _this.snortify.error('error occured');
                    }
                }, (function (err) {
                    _this.snortify.error('Incorrect password or user does not exist');
                }));
            }
        }; // end of login function
        this.forgotPassword = function () {
            if (!_this.email) {
                _this.snortify.create({
                    title: "Email",
                    body: "Please enter Email and then click on forgot password to proceed with password recovery options",
                    config: {
                        position: ng_snotify_2.SnotifyPosition.centerTop,
                        type: 'confirm'
                    }
                });
                //  ('please enter email to proceed with the password recovery options')
            }
            else {
                var details_1 = {
                    email: _this.email,
                    PasswordResetToken: shortid.generate(),
                    PasswordResetExpiration: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                };
                _this.userService.updateUserUsingEmail(details_1).subscribe(function (response) {
                    //  console.log(response);
                    if (response.data.nModified > 0) {
                        var mailDetails = {
                            receiver: _this.email,
                            subject: 'Your password reset Link Is Here',
                            html: "<p>Hi,</p><h4>Below is your password rest link, it is valid for a period of 24hrs</h4><br><p>htts://to-doapp.tech2praveen.info" + details_1.PasswordResetToken + "</p><br><p>Regards:</p><p>TODO-list Team</p>"
                        };
                        // this.socketService.sendMail(mailDetails);
                        // console.log(mailDetails);
                        //  this.router.navigate([`reset-passoword/${details.PasswordResetToken}`])
                        // alert('An email has been sent to you, please click on the link in the email to reset your password');
                        _this.snortify.create({
                            title: "Link sent",
                            body: "An email has been sent to you, please click on the link in the email to reset your password",
                            config: {
                                position: ng_snotify_2.SnotifyPosition.centerTop,
                                type: 'confirm'
                            }
                        });
                    }
                    else {
                        _this.snortify.error('no account found with Email');
                    }
                }, (function (err) {
                    _this.snortify.error('Error occured');
                }));
            }
        };
    } // end of constructor
    LoginComponent.prototype.ngOnInit = function () {
    }; // end of ng oninit
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [user_service_service_1.UserServiceService, ng_snotify_1.SnotifyService])
    ], LoginComponent);
    return LoginComponent;
}()); // end of class  login component
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map