(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["user-user-module"],{

/***/ "./src/app/user/login/login.component.css":
/*!************************************************!*\
  !*** ./src/app/user/login/login.component.css ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".box{\r\n    box-shadow: 0 1px 2px 0 gray;\r\n    border-radius: 10px;\r\n    background: #566b63bf;\r\n    color: white\r\n}\r\n\r\n\r\n.container{\r\n    padding-top:5%; \r\n\r\n}\r\n\r\n\r\nlabel,button{\r\n    font-weight: 500;\r\n    font-family: cursive;\r\n}"

/***/ }),

/***/ "./src/app/user/login/login.component.html":
/*!*************************************************!*\
  !*** ./src/app/user/login/login.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" >\r\n  <div class=\"row\">\r\n    <div class=\"col-md-4\">\r\n    \r\n    </div>\r\n \r\n    \r\n\r\n    <div style=\"padding:2%\" class=\"col-md-4 box\">\r\n\r\n        <div style=\"text-align: center\">\r\n            <h5>ExpenseSplitz</h5>\r\n          \r\n        <div style=\"text-align: center\">\r\n          <img src=\"../../../assets/todoicon.png\" style=\"width: 25%;\">\r\n        </div>\r\n  \r\n        <div style=\"padding:2%;margin-top: 5%;\">\r\n          <label for=\"email\">Email address</label>\r\n          <input type=\"email\" [(ngModel)]=\"email\" class=\"form-control\" id=\"email\" placeholder=\"Enter email\">\r\n        </div>\r\n  \r\n        <div style=\"padding:2%\">\r\n          <label for=\"password\">Password</label>\r\n          <input type=\"password\" class=\"form-control\" id=\"password\" [(ngModel)]=\"password\" placeholder=\"Password\">\r\n        </div>\r\n        <br>\r\n        <div style=\"text-align:center\">\r\n          <button (click)=\"login()\" type=\"submit\" class=\"btn btn-primary\">Submit</button>\r\n        </div>\r\n        <br>\r\n        <br>\r\n        <div>\r\n          <div (click)=\"forgotPassword()\" style=\"cursor: pointer\" class=\"badge badge-warning\">Forgot Password?</div><span style =\"margin-left: 50%\"  class=\"badge badge-primary\"><a style='color:white;' href=\"/signup\">Signup</a></span>\r\n        </div>\r\n  \r\n  \r\n      </div>\r\n  </div>\r\n  <div class=\"col-md-4\">\r\n    \r\n    </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./src/app/user/login/login.component.ts":
/*!***********************************************!*\
  !*** ./src/app/user/login/login.component.ts ***!
  \***********************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_service_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../user-service.service */ "./src/app/user-service.service.ts");
/* harmony import */ var ng2_cookies_ng2_cookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng2-cookies/ng2-cookies */ "./node_modules/ng2-cookies/ng2-cookies.js");
/* harmony import */ var ng2_cookies_ng2_cookies__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ng2_cookies_ng2_cookies__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ng_snotify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-snotify */ "./node_modules/ng-snotify/index.js");
/* harmony import */ var _socket_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../socket-service.service */ "./src/app/socket-service.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var shortid = __webpack_require__(/*! shortid */ "./node_modules/shortid/index.js");




var LoginComponent = /** @class */ (function () {
    function LoginComponent(userService, snortify, socketService, elementRef, router, _router) {
        var _this = this;
        this.userService = userService;
        this.snortify = snortify;
        this.socketService = socketService;
        this.elementRef = elementRef;
        this.router = router;
        this._router = _router;
        this.checkUserStatus = function () {
            if (_this.userService.getUserInfoInLocalStorage() != null) {
                if (_this.userService.getUserInfoInLocalStorage().userId) {
                    if (ng2_cookies_ng2_cookies__WEBPACK_IMPORTED_MODULE_2__["Cookie"].get('authToken') != '' && ng2_cookies_ng2_cookies__WEBPACK_IMPORTED_MODULE_2__["Cookie"].get('authToken') != null && ng2_cookies_ng2_cookies__WEBPACK_IMPORTED_MODULE_2__["Cookie"].get('authToken') != undefined && (ng2_cookies_ng2_cookies__WEBPACK_IMPORTED_MODULE_2__["Cookie"].get('authToken'))) {
                        _this.router.navigate(['/expense']);
                    }
                }
            }
        };
        //Login Method
        this.login = function () {
            if (!_this.email) {
                _this.snortify.error('Enter Email');
            }
            else if (!_this.password) {
                _this.snortify.error('Enter Password');
            }
            else {
                var loginDetails = {
                    email: _this.email,
                    password: _this.password
                };
                _this.userService.loginFunction(loginDetails).subscribe(function (response) {
                    if (response.status === 200) {
                        _this.snortify.success('Login successfull');
                        ng2_cookies_ng2_cookies__WEBPACK_IMPORTED_MODULE_2__["Cookie"].set('authToken', response.data.authToken);
                        _this.userService.setUserInfoInLocalStorage(response.data.userDetails);
                        window.location.assign("/expense");
                    }
                    else {
                        _this.snortify.error('error occured');
                    }
                }, (function (err) {
                    _this.snortify.error('Incorrect credentials or user does not exist');
                }));
            }
        }; // end of login method
        //Method to process forgot password
        this.forgotPassword = function () {
            if (!_this.email) {
                _this.snortify.create({
                    title: "Email Required",
                    body: "Please enter Email and then click on Forgot Password to recover Password.",
                    config: {
                        position: ng_snotify__WEBPACK_IMPORTED_MODULE_3__["SnotifyPosition"].centerTop,
                        type: 'warning'
                    }
                });
            }
            else {
                var details_1 = {
                    email: _this.email,
                    PasswordResetToken: shortid.generate(),
                    PasswordResetExpiration: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                };
                _this.userService.updateUserUsingEmail(details_1).subscribe(function (response) {
                    if (response.data.nModified > 0) {
                        var mailDetails = {
                            receiver: _this.email,
                            subject: 'Expensesplitz - Password Reset',
                            html: "<p>Hi,</p><h4>Below is your password rest link, it is valid for a period of 24hrs</h4><br><p>http://expensesplitz.tech2praveen.info/passwordReset/" + details_1.PasswordResetToken + "</p><br><p>Regards:</p><p>Expensesplitz Team</p>"
                        };
                        _this.socketService.sendMail(mailDetails);
                        _this.snortify.create({
                            title: "Link sent",
                            body: "An email has been sent to you, please click on the link in the email to reset your password",
                            config: {
                                position: ng_snotify__WEBPACK_IMPORTED_MODULE_3__["SnotifyPosition"].centerTop,
                                type: 'confirm'
                            }
                        });
                    }
                    else {
                        _this.snortify.error('No account found with Email');
                    }
                }, (function (err) {
                    _this.snortify.error('Error occured');
                }));
            }
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.checkUserStatus();
        this.elementRef.nativeElement.ownerDocument.body.style.background = "url('../../../assets/background.jpg') no-repeat center center fixed";
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundSize = "cover";
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/user/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.css */ "./src/app/user/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service_service__WEBPACK_IMPORTED_MODULE_1__["UserServiceService"], ng_snotify__WEBPACK_IMPORTED_MODULE_3__["SnotifyService"], _socket_service_service__WEBPACK_IMPORTED_MODULE_4__["SocketServiceService"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]])
    ], LoginComponent);
    return LoginComponent;
}()); // end of forgotPassword Method



/***/ }),

/***/ "./src/app/user/password-rest/password-rest.component.css":
/*!****************************************************************!*\
  !*** ./src/app/user/password-rest/password-rest.component.css ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".box{\r\n    border-radius: 5px;\r\n    background: black;\r\n    opacity: 0.7;\r\n    color:white;\r\n    padding: 1%;\r\n}\r\n"

/***/ }),

/***/ "./src/app/user/password-rest/password-rest.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/user/password-rest/password-rest.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n    \r\n    <div style=\"margin: 15% 0 0 0\" class=\"row\">\r\n    \r\n      <div class=\"col-md-3\"></div>\r\n    \r\n      \r\n    <div class=\"col-md-6 box\">\r\n    \r\n      <div class=\"form-group\">\r\n        <label>Enter New Password</label>\r\n        <input [(ngModel)]=\"password\" type=\"password\" class=\"form-control\" placeholder=\"New Password\">\r\n      </div>\r\n      \r\n    <button type=\"submit\" (click)=\"update()\" class=\"btn btn-primary btn-md\" style=\"float: right\">Submit</button>\r\n\r\n    \r\n    \r\n    </div>\r\n      <div class=\"col-md-3\"></div>\r\n    </div>\r\n    \r\n    </div>\r\n    \r\n    "

/***/ }),

/***/ "./src/app/user/password-rest/password-rest.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/user/password-rest/password-rest.component.ts ***!
  \***************************************************************/
/*! exports provided: PasswordRestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PasswordRestComponent", function() { return PasswordRestComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_service_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../user-service.service */ "./src/app/user-service.service.ts");
/* harmony import */ var _socket_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../socket-service.service */ "./src/app/socket-service.service.ts");
/* harmony import */ var ng_snotify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-snotify */ "./node_modules/ng-snotify/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PasswordRestComponent = /** @class */ (function () {
    function PasswordRestComponent(userService, router, socketService, _router, snortify, elementRef) {
        var _this = this;
        this.userService = userService;
        this.router = router;
        this.socketService = socketService;
        this._router = _router;
        this.snortify = snortify;
        this.elementRef = elementRef;
        this.date = new Date();
        this.getInfoUsingToken = function (token) {
            _this.userService.getInfoUsingToken(token).subscribe(function (response) {
                console.log(response);
                if (response.status == 200) {
                    if ((response.data.PasswordResetToken == _this.token) && (Date.parse("" + response.data.PasswordResetExpiration) > Date.parse("" + _this.date))) {
                        // console.log('user verified')
                        _this.emailReceived = response.data.email;
                    }
                    else {
                        alert('some error occured');
                        _this.router.navigate(['/login']);
                    }
                }
                else {
                    _this.router.navigate(['/login']);
                }
            }, (function (err) {
                _this.router.navigate(['/login']);
            }));
        };
        this.update = function () {
            if (!_this.emailReceived) {
                _this.snortify.error('Error has occured, Please try again');
            }
            else if (!_this.CheckPassword(_this.password)) {
                _this.snortify.create({
                    title: "Check",
                    body: "Your Password must be between 7 to 15 characters which contain at least one digit and a special character.",
                    config: {
                        position: ng_snotify__WEBPACK_IMPORTED_MODULE_4__["SnotifyPosition"].centerTop,
                        type: 'warning'
                    }
                });
            }
            else {
                var details = {
                    email: _this.emailReceived,
                    password: _this.password
                };
                _this.userService.updatePassword(details).subscribe(function (response) {
                    if (response.status === 200) {
                        _this.snortify.success('Password changed successfully');
                        _this.router.navigate(['/login']);
                    }
                    else {
                        _this.snortify.error(response.message);
                    }
                });
            }
        };
    }
    PasswordRestComponent.prototype.ngOnInit = function () {
        this.token = this._router.snapshot.paramMap.get('resetToken');
        this.elementRef.nativeElement.ownerDocument.body.style.background = "url('../../../assets/background.jpg') no-repeat center center fixed";
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundSize = "cover";
        this.getInfoUsingToken(this.token);
    };
    //end of update
    //Check entered password using regex
    PasswordRestComponent.prototype.CheckPassword = function (inputtxt) {
        if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(inputtxt)) {
            return true;
        }
        else {
            return false;
        }
    }; // end of password validation
    PasswordRestComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-password-rest',
            template: __webpack_require__(/*! ./password-rest.component.html */ "./src/app/user/password-rest/password-rest.component.html"),
            styles: [__webpack_require__(/*! ./password-rest.component.css */ "./src/app/user/password-rest/password-rest.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service_service__WEBPACK_IMPORTED_MODULE_2__["UserServiceService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _socket_service_service__WEBPACK_IMPORTED_MODULE_3__["SocketServiceService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], ng_snotify__WEBPACK_IMPORTED_MODULE_4__["SnotifyService"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], PasswordRestComponent);
    return PasswordRestComponent;
}());



/***/ }),

/***/ "./src/app/user/signup/signup.component.css":
/*!**************************************************!*\
  !*** ./src/app/user/signup/signup.component.css ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".box{\r\n    box-shadow: 0 1px 2px 0 gray;\r\n    border-radius: 10px;\r\n    background: #566b63bf;\r\n    color: white\r\n}\r\n\r\n\r\n.container{\r\n    padding-top:5%; \r\n\r\n}\r\n\r\n\r\nlabel,button{\r\n    font-weight: 500;\r\n    font-family: cursive;\r\n}"

/***/ }),

/***/ "./src/app/user/signup/signup.component.html":
/*!***************************************************!*\
  !*** ./src/app/user/signup/signup.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div cass=\"container\">\r\n  <div style=\"padding:2%\" class=\"row\">\r\n    <div class=\"col-md-4\"></div>\r\n    <div class=\"col-md-4 box\">\r\n\r\n      <div style=\"text-align: center\">\r\n        <br>\r\n        <h5>ExpenseSplitz</h5>\r\n      </div>\r\n\r\n      <div style=\"text-align: center\">\r\n          <img src=\"../../../assets/todoicon.png\" style=\"width: 20%;\">\r\n      </div>\r\n\r\n      <div style=\"padding:1%\">\r\n        <label for=\"name\">Name</label>\r\n\r\n        <div class=\"row\">\r\n\r\n          <div class=\"col\">\r\n        <input [(ngModel)]=\"firstName\"  placeholder=\"First Name\" class=\"form-control\" type=\"text\"> \r\n      </div>\r\n      <div class=\"col\">\r\n        <input [(ngModel)]=\"lastName\" placeholder=\"Last Name\" class=\"form-control\" type=\"text\">\r\n      </div>\r\n    </div>\r\n\r\n      </div>\r\n\r\n     <div style=\"padding:1%\">\r\n       <label for=\"email\">Email Address</label>\r\n       <input class=\"form-control\" type=\"email\" placeholder=\"Email\" [(ngModel)]=\"email\"> \r\n     </div>\r\n\r\n     <div style=\"padding: 1%\">\r\n       <label>Phone Number</label>\r\n       \r\n       <div class=\"row\">\r\n        <div class=\"col-md-5\">\r\n          <select name=\"countryCode\" class=\"form-control\" [(ngModel)]=\"countryCode\">\r\n\r\n              <option data-countryCode=\"IN\" value=\"91\">India (+91)</option>\r\n              <optgroup label=\"Other countries\">  \r\n                  <option data-countryCode=\"GB\" value=\"44\" Selected>UK (+44)</option>\r\n                  <option data-countryCode=\"US\" value=\"1\">USA (+1)</option>    \r\n                <option data-countryCode=\"DZ\" value=\"213\">Algeria (+213)</option>\r\n                <option data-countryCode=\"AD\" value=\"376\">Andorra (+376)</option>\r\n                <option data-countryCode=\"AO\" value=\"244\">Angola (+244)</option>\r\n                <option data-countryCode=\"AI\" value=\"1264\">Anguilla (+1264)</option>\r\n                <option data-countryCode=\"AG\" value=\"1268\">Antigua &amp; Barbuda (+1268)</option>\r\n                <option data-countryCode=\"AR\" value=\"54\">Argentina (+54)</option>\r\n                <option data-countryCode=\"AM\" value=\"374\">Armenia (+374)</option>\r\n                <option data-countryCode=\"AW\" value=\"297\">Aruba (+297)</option>\r\n                <option data-countryCode=\"AU\" value=\"61\">Australia (+61)</option>\r\n                <option data-countryCode=\"AT\" value=\"43\">Austria (+43)</option>\r\n                <option data-countryCode=\"AZ\" value=\"994\">Azerbaijan (+994)</option>\r\n                <option data-countryCode=\"BS\" value=\"1242\">Bahamas (+1242)</option>\r\n                <option data-countryCode=\"BH\" value=\"973\">Bahrain (+973)</option>\r\n                <option data-countryCode=\"BD\" value=\"880\">Bangladesh (+880)</option>\r\n                <option data-countryCode=\"BB\" value=\"1246\">Barbados (+1246)</option>\r\n                <option data-countryCode=\"BY\" value=\"375\">Belarus (+375)</option>\r\n                <option data-countryCode=\"BE\" value=\"32\">Belgium (+32)</option>\r\n                <option data-countryCode=\"BZ\" value=\"501\">Belize (+501)</option>\r\n                <option data-countryCode=\"BJ\" value=\"229\">Benin (+229)</option>\r\n                <option data-countryCode=\"BM\" value=\"1441\">Bermuda (+1441)</option>\r\n                <option data-countryCode=\"BT\" value=\"975\">Bhutan (+975)</option>\r\n                <option data-countryCode=\"BO\" value=\"591\">Bolivia (+591)</option>\r\n                <option data-countryCode=\"BA\" value=\"387\">Bosnia Herzegovina (+387)</option>\r\n                <option data-countryCode=\"BW\" value=\"267\">Botswana (+267)</option>\r\n                <option data-countryCode=\"BR\" value=\"55\">Brazil (+55)</option>\r\n                <option data-countryCode=\"BN\" value=\"673\">Brunei (+673)</option>\r\n                <option data-countryCode=\"BG\" value=\"359\">Bulgaria (+359)</option>\r\n                <option data-countryCode=\"BF\" value=\"226\">Burkina Faso (+226)</option>\r\n                <option data-countryCode=\"BI\" value=\"257\">Burundi (+257)</option>\r\n                <option data-countryCode=\"KH\" value=\"855\">Cambodia (+855)</option>\r\n                <option data-countryCode=\"CM\" value=\"237\">Cameroon (+237)</option>\r\n                <option data-countryCode=\"CA\" value=\"1\">Canada (+1)</option>\r\n                <option data-countryCode=\"CV\" value=\"238\">Cape Verde Islands (+238)</option>\r\n                <option data-countryCode=\"KY\" value=\"1345\">Cayman Islands (+1345)</option>\r\n                <option data-countryCode=\"CF\" value=\"236\">Central African Republic (+236)</option>\r\n                <option data-countryCode=\"CL\" value=\"56\">Chile (+56)</option>\r\n                <option data-countryCode=\"CN\" value=\"86\">China (+86)</option>\r\n                <option data-countryCode=\"CO\" value=\"57\">Colombia (+57)</option>\r\n                <option data-countryCode=\"KM\" value=\"269\">Comoros (+269)</option>\r\n                <option data-countryCode=\"CG\" value=\"242\">Congo (+242)</option>\r\n                <option data-countryCode=\"CK\" value=\"682\">Cook Islands (+682)</option>\r\n                <option data-countryCode=\"CR\" value=\"506\">Costa Rica (+506)</option>\r\n                <option data-countryCode=\"HR\" value=\"385\">Croatia (+385)</option>\r\n                <option data-countryCode=\"CU\" value=\"53\">Cuba (+53)</option>\r\n                <option data-countryCode=\"CY\" value=\"90392\">Cyprus North (+90392)</option>\r\n                <option data-countryCode=\"CY\" value=\"357\">Cyprus South (+357)</option>\r\n                <option data-countryCode=\"CZ\" value=\"42\">Czech Republic (+42)</option>\r\n                <option data-countryCode=\"DK\" value=\"45\">Denmark (+45)</option>\r\n                <option data-countryCode=\"DJ\" value=\"253\">Djibouti (+253)</option>\r\n                <option data-countryCode=\"DM\" value=\"1809\">Dominica (+1809)</option>\r\n                <option data-countryCode=\"DO\" value=\"1809\">Dominican Republic (+1809)</option>\r\n                <option data-countryCode=\"EC\" value=\"593\">Ecuador (+593)</option>\r\n                <option data-countryCode=\"EG\" value=\"20\">Egypt (+20)</option>\r\n                <option data-countryCode=\"SV\" value=\"503\">El Salvador (+503)</option>\r\n                <option data-countryCode=\"GQ\" value=\"240\">Equatorial Guinea (+240)</option>\r\n                <option data-countryCode=\"ER\" value=\"291\">Eritrea (+291)</option>\r\n                <option data-countryCode=\"EE\" value=\"372\">Estonia (+372)</option>\r\n                <option data-countryCode=\"ET\" value=\"251\">Ethiopia (+251)</option>\r\n                <option data-countryCode=\"FK\" value=\"500\">Falkland Islands (+500)</option>\r\n                <option data-countryCode=\"FO\" value=\"298\">Faroe Islands (+298)</option>\r\n                <option data-countryCode=\"FJ\" value=\"679\">Fiji (+679)</option>\r\n                <option data-countryCode=\"FI\" value=\"358\">Finland (+358)</option>\r\n                <option data-countryCode=\"FR\" value=\"33\">France (+33)</option>\r\n                <option data-countryCode=\"GF\" value=\"594\">French Guiana (+594)</option>\r\n                <option data-countryCode=\"PF\" value=\"689\">French Polynesia (+689)</option>\r\n                <option data-countryCode=\"GA\" value=\"241\">Gabon (+241)</option>\r\n                <option data-countryCode=\"GM\" value=\"220\">Gambia (+220)</option>\r\n                <option data-countryCode=\"GE\" value=\"7880\">Georgia (+7880)</option>\r\n                <option data-countryCode=\"DE\" value=\"49\">Germany (+49)</option>\r\n                <option data-countryCode=\"GH\" value=\"233\">Ghana (+233)</option>\r\n                <option data-countryCode=\"GI\" value=\"350\">Gibraltar (+350)</option>\r\n                <option data-countryCode=\"GR\" value=\"30\">Greece (+30)</option>\r\n                <option data-countryCode=\"GL\" value=\"299\">Greenland (+299)</option>\r\n                <option data-countryCode=\"GD\" value=\"1473\">Grenada (+1473)</option>\r\n                <option data-countryCode=\"GP\" value=\"590\">Guadeloupe (+590)</option>\r\n                <option data-countryCode=\"GU\" value=\"671\">Guam (+671)</option>\r\n                <option data-countryCode=\"GT\" value=\"502\">Guatemala (+502)</option>\r\n                <option data-countryCode=\"GN\" value=\"224\">Guinea (+224)</option>\r\n                <option data-countryCode=\"GW\" value=\"245\">Guinea - Bissau (+245)</option>\r\n                <option data-countryCode=\"GY\" value=\"592\">Guyana (+592)</option>\r\n                <option data-countryCode=\"HT\" value=\"509\">Haiti (+509)</option>\r\n                <option data-countryCode=\"HN\" value=\"504\">Honduras (+504)</option>\r\n                <option data-countryCode=\"HK\" value=\"852\">Hong Kong (+852)</option>\r\n                <option data-countryCode=\"HU\" value=\"36\">Hungary (+36)</option>\r\n                <option data-countryCode=\"IS\" value=\"354\">Iceland (+354)</option>\r\n                <option data-countryCode=\"ID\" value=\"62\">Indonesia (+62)</option>\r\n                <option data-countryCode=\"IR\" value=\"98\">Iran (+98)</option>\r\n                <option data-countryCode=\"IQ\" value=\"964\">Iraq (+964)</option>\r\n                <option data-countryCode=\"IE\" value=\"353\">Ireland (+353)</option>\r\n                <option data-countryCode=\"IL\" value=\"972\">Israel (+972)</option>\r\n                <option data-countryCode=\"IT\" value=\"39\">Italy (+39)</option>\r\n                <option data-countryCode=\"JM\" value=\"1876\">Jamaica (+1876)</option>\r\n                <option data-countryCode=\"JP\" value=\"81\">Japan (+81)</option>\r\n                <option data-countryCode=\"JO\" value=\"962\">Jordan (+962)</option>\r\n                <option data-countryCode=\"KZ\" value=\"7\">Kazakhstan (+7)</option>\r\n                <option data-countryCode=\"KE\" value=\"254\">Kenya (+254)</option>\r\n                <option data-countryCode=\"KI\" value=\"686\">Kiribati (+686)</option>\r\n                <option data-countryCode=\"KP\" value=\"850\">Korea North (+850)</option>\r\n                <option data-countryCode=\"KR\" value=\"82\">Korea South (+82)</option>\r\n                <option data-countryCode=\"KW\" value=\"965\">Kuwait (+965)</option>\r\n                <option data-countryCode=\"KG\" value=\"996\">Kyrgyzstan (+996)</option>\r\n                <option data-countryCode=\"LA\" value=\"856\">Laos (+856)</option>\r\n                <option data-countryCode=\"LV\" value=\"371\">Latvia (+371)</option>\r\n                <option data-countryCode=\"LB\" value=\"961\">Lebanon (+961)</option>\r\n                <option data-countryCode=\"LS\" value=\"266\">Lesotho (+266)</option>\r\n                <option data-countryCode=\"LR\" value=\"231\">Liberia (+231)</option>\r\n                <option data-countryCode=\"LY\" value=\"218\">Libya (+218)</option>\r\n                <option data-countryCode=\"LI\" value=\"417\">Liechtenstein (+417)</option>\r\n                <option data-countryCode=\"LT\" value=\"370\">Lithuania (+370)</option>\r\n                <option data-countryCode=\"LU\" value=\"352\">Luxembourg (+352)</option>\r\n                <option data-countryCode=\"MO\" value=\"853\">Macao (+853)</option>\r\n                <option data-countryCode=\"MK\" value=\"389\">Macedonia (+389)</option>\r\n                <option data-countryCode=\"MG\" value=\"261\">Madagascar (+261)</option>\r\n                <option data-countryCode=\"MW\" value=\"265\">Malawi (+265)</option>\r\n                <option data-countryCode=\"MY\" value=\"60\">Malaysia (+60)</option>\r\n                <option data-countryCode=\"MV\" value=\"960\">Maldives (+960)</option>\r\n                <option data-countryCode=\"ML\" value=\"223\">Mali (+223)</option>\r\n                <option data-countryCode=\"MT\" value=\"356\">Malta (+356)</option>\r\n                <option data-countryCode=\"MH\" value=\"692\">Marshall Islands (+692)</option>\r\n                <option data-countryCode=\"MQ\" value=\"596\">Martinique (+596)</option>\r\n                <option data-countryCode=\"MR\" value=\"222\">Mauritania (+222)</option>\r\n                <option data-countryCode=\"YT\" value=\"269\">Mayotte (+269)</option>\r\n                <option data-countryCode=\"MX\" value=\"52\">Mexico (+52)</option>\r\n                <option data-countryCode=\"FM\" value=\"691\">Micronesia (+691)</option>\r\n                <option data-countryCode=\"MD\" value=\"373\">Moldova (+373)</option>\r\n                <option data-countryCode=\"MC\" value=\"377\">Monaco (+377)</option>\r\n                <option data-countryCode=\"MN\" value=\"976\">Mongolia (+976)</option>\r\n                <option data-countryCode=\"MS\" value=\"1664\">Montserrat (+1664)</option>\r\n                <option data-countryCode=\"MA\" value=\"212\">Morocco (+212)</option>\r\n                <option data-countryCode=\"MZ\" value=\"258\">Mozambique (+258)</option>\r\n                <option data-countryCode=\"MN\" value=\"95\">Myanmar (+95)</option>\r\n                <option data-countryCode=\"NA\" value=\"264\">Namibia (+264)</option>\r\n                <option data-countryCode=\"NR\" value=\"674\">Nauru (+674)</option>\r\n                <option data-countryCode=\"NP\" value=\"977\">Nepal (+977)</option>\r\n                <option data-countryCode=\"NL\" value=\"31\">Netherlands (+31)</option>\r\n                <option data-countryCode=\"NC\" value=\"687\">New Caledonia (+687)</option>\r\n                <option data-countryCode=\"NZ\" value=\"64\">New Zealand (+64)</option>\r\n                <option data-countryCode=\"NI\" value=\"505\">Nicaragua (+505)</option>\r\n                <option data-countryCode=\"NE\" value=\"227\">Niger (+227)</option>\r\n                <option data-countryCode=\"NG\" value=\"234\">Nigeria (+234)</option>\r\n                <option data-countryCode=\"NU\" value=\"683\">Niue (+683)</option>\r\n                <option data-countryCode=\"NF\" value=\"672\">Norfolk Islands (+672)</option>\r\n                <option data-countryCode=\"NP\" value=\"670\">Northern Marianas (+670)</option>\r\n                <option data-countryCode=\"NO\" value=\"47\">Norway (+47)</option>\r\n                <option data-countryCode=\"OM\" value=\"968\">Oman (+968)</option>\r\n                <option data-countryCode=\"PW\" value=\"680\">Palau (+680)</option>\r\n                <option data-countryCode=\"PA\" value=\"507\">Panama (+507)</option>\r\n                <option data-countryCode=\"PG\" value=\"675\">Papua New Guinea (+675)</option>\r\n                <option data-countryCode=\"PY\" value=\"595\">Paraguay (+595)</option>\r\n                <option data-countryCode=\"PE\" value=\"51\">Peru (+51)</option>\r\n                <option data-countryCode=\"PH\" value=\"63\">Philippines (+63)</option>\r\n                <option data-countryCode=\"PL\" value=\"48\">Poland (+48)</option>\r\n                <option data-countryCode=\"PT\" value=\"351\">Portugal (+351)</option>\r\n                <option data-countryCode=\"PR\" value=\"1787\">Puerto Rico (+1787)</option>\r\n                <option data-countryCode=\"QA\" value=\"974\">Qatar (+974)</option>\r\n                <option data-countryCode=\"RE\" value=\"262\">Reunion (+262)</option>\r\n                <option data-countryCode=\"RO\" value=\"40\">Romania (+40)</option>\r\n                <option data-countryCode=\"RU\" value=\"7\">Russia (+7)</option>\r\n                <option data-countryCode=\"RW\" value=\"250\">Rwanda (+250)</option>\r\n                <option data-countryCode=\"SM\" value=\"378\">San Marino (+378)</option>\r\n                <option data-countryCode=\"ST\" value=\"239\">Sao Tome &amp; Principe (+239)</option>\r\n                <option data-countryCode=\"SA\" value=\"966\">Saudi Arabia (+966)</option>\r\n                <option data-countryCode=\"SN\" value=\"221\">Senegal (+221)</option>\r\n                <option data-countryCode=\"CS\" value=\"381\">Serbia (+381)</option>\r\n                <option data-countryCode=\"SC\" value=\"248\">Seychelles (+248)</option>\r\n                <option data-countryCode=\"SL\" value=\"232\">Sierra Leone (+232)</option>\r\n                <option data-countryCode=\"SG\" value=\"65\">Singapore (+65)</option>\r\n                <option data-countryCode=\"SK\" value=\"421\">Slovak Republic (+421)</option>\r\n                <option data-countryCode=\"SI\" value=\"386\">Slovenia (+386)</option>\r\n                <option data-countryCode=\"SB\" value=\"677\">Solomon Islands (+677)</option>\r\n                <option data-countryCode=\"SO\" value=\"252\">Somalia (+252)</option>\r\n                <option data-countryCode=\"ZA\" value=\"27\">South Africa (+27)</option>\r\n                <option data-countryCode=\"ES\" value=\"34\">Spain (+34)</option>\r\n                <option data-countryCode=\"LK\" value=\"94\">Sri Lanka (+94)</option>\r\n                <option data-countryCode=\"SH\" value=\"290\">St. Helena (+290)</option>\r\n                <option data-countryCode=\"KN\" value=\"1869\">St. Kitts (+1869)</option>\r\n                <option data-countryCode=\"SC\" value=\"1758\">St. Lucia (+1758)</option>\r\n                <option data-countryCode=\"SD\" value=\"249\">Sudan (+249)</option>\r\n                <option data-countryCode=\"SR\" value=\"597\">Suriname (+597)</option>\r\n                <option data-countryCode=\"SZ\" value=\"268\">Swaziland (+268)</option>\r\n                <option data-countryCode=\"SE\" value=\"46\">Sweden (+46)</option>\r\n                <option data-countryCode=\"CH\" value=\"41\">Switzerland (+41)</option>\r\n                <option data-countryCode=\"SI\" value=\"963\">Syria (+963)</option>\r\n                <option data-countryCode=\"TW\" value=\"886\">Taiwan (+886)</option>\r\n                <option data-countryCode=\"TJ\" value=\"7\">Tajikstan (+7)</option>\r\n                <option data-countryCode=\"TH\" value=\"66\">Thailand (+66)</option>\r\n                <option data-countryCode=\"TG\" value=\"228\">Togo (+228)</option>\r\n                <option data-countryCode=\"TO\" value=\"676\">Tonga (+676)</option>\r\n                <option data-countryCode=\"TT\" value=\"1868\">Trinidad &amp; Tobago (+1868)</option>\r\n                <option data-countryCode=\"TN\" value=\"216\">Tunisia (+216)</option>\r\n                <option data-countryCode=\"TR\" value=\"90\">Turkey (+90)</option>\r\n                <option data-countryCode=\"TM\" value=\"7\">Turkmenistan (+7)</option>\r\n                <option data-countryCode=\"TM\" value=\"993\">Turkmenistan (+993)</option>\r\n                <option data-countryCode=\"TC\" value=\"1649\">Turks &amp; Caicos Islands (+1649)</option>\r\n                <option data-countryCode=\"TV\" value=\"688\">Tuvalu (+688)</option>\r\n                <option data-countryCode=\"UG\" value=\"256\">Uganda (+256)</option>\r\n                <!-- <option data-countryCode=\"GB\" value=\"44\">UK (+44)</option> -->\r\n                <option data-countryCode=\"UA\" value=\"380\">Ukraine (+380)</option>\r\n                <option data-countryCode=\"AE\" value=\"971\">United Arab Emirates (+971)</option>\r\n                <option data-countryCode=\"UY\" value=\"598\">Uruguay (+598)</option>\r\n                <!-- <option data-countryCode=\"US\" value=\"1\">USA (+1)</option> -->\r\n                <option data-countryCode=\"UZ\" value=\"7\">Uzbekistan (+7)</option>\r\n                <option data-countryCode=\"VU\" value=\"678\">Vanuatu (+678)</option>\r\n                <option data-countryCode=\"VA\" value=\"379\">Vatican City (+379)</option>\r\n                <option data-countryCode=\"VE\" value=\"58\">Venezuela (+58)</option>\r\n                <option data-countryCode=\"VN\" value=\"84\">Vietnam (+84)</option>\r\n                <option data-countryCode=\"VG\" value=\"84\">Virgin Islands - British (+1284)</option>\r\n                <option data-countryCode=\"VI\" value=\"84\">Virgin Islands - US (+1340)</option>\r\n                <option data-countryCode=\"WF\" value=\"681\">Wallis &amp; Futuna (+681)</option>\r\n                <option data-countryCode=\"YE\" value=\"969\">Yemen (North)(+969)</option>\r\n                <option data-countryCode=\"YE\" value=\"967\">Yemen (South)(+967)</option>\r\n                <option data-countryCode=\"ZM\" value=\"260\">Zambia (+260)</option>\r\n                <option data-countryCode=\"ZW\" value=\"263\">Zimbabwe (+263)</option>\r\n              </optgroup>\r\n\r\n\r\n\r\n            </select>\r\n        </div>\r\n        <div class=\"col-md-7\">\r\n          <input type=\"tel\" class=\"form-control\" [(ngModel)]=\"mobileNumber\" placeholder=\"Phone Number\">\r\n        </div>\r\n       </div>\r\n     </div>\r\n\r\n     <div style=\"padding: 1%\">\r\n       <label>Password</label>\r\n       <input type=\"password\" class=\"form-control\" [(ngModel)]=\"password\" placeholder=\"Password\">\r\n     </div>\r\n\r\n     <div style=\"padding: 1%; text-align: center\">\r\n       <button class=\"btn btn-primary\" (click)=\"signUp()\" type=\"submit\">Signup</button><br><br>\r\n        <a style=\"color:white;font-size: 20px\" href=\"/login\">Have an account already?</a>\r\n     </div>\r\n\r\n    </div>\r\n    <div class=\"col-md-4\"></div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/user/signup/signup.component.ts":
/*!*************************************************!*\
  !*** ./src/app/user/signup/signup.component.ts ***!
  \*************************************************/
/*! exports provided: SignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupComponent", function() { return SignupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_service_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../user-service.service */ "./src/app/user-service.service.ts");
/* harmony import */ var ng_snotify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-snotify */ "./node_modules/ng-snotify/index.js");
/* harmony import */ var _socket_service_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../socket-service.service */ "./src/app/socket-service.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SignupComponent = /** @class */ (function () {
    function SignupComponent(userService, snortify, socketService, elementRef) {
        var _this = this;
        this.userService = userService;
        this.snortify = snortify;
        this.socketService = socketService;
        this.elementRef = elementRef;
        //Method to process signup
        this.signUp = function () {
            if (!_this.firstName) {
                _this.snortify.error('Please add First Name');
            }
            else if (!_this.lastName) {
                _this.snortify.error('Please add Last Name');
            }
            else if (!_this.validateEmail(_this.email)) {
                _this.snortify.error('Invalid Email');
            }
            else if (!_this.CheckPassword(_this.password)) {
                _this.snortify.error('Your password must be between 7 to 15 characters which contain at least one digit and a special character.');
            }
            else if (!_this.countryCode) {
                _this.snortify.error('Country Code missing');
            }
            else if (!_this.phonenumberCheck(_this.mobileNumber)) {
                _this.snortify.error('Invalid Mobile Number');
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
                    if (response.status === 200) {
                        var mailDetails = {
                            receiver: response.data.email,
                            subject: 'Welcome to Expensesplitz',
                            html: "<p>Hi,</p><br><p>Thank you for joining Expensesplitz, start adding friends and spliting expenses.</p><br><p>Regards: </p><p>Expensesplitz Team</p>"
                        };
                        _this.socketService.sendMail(mailDetails);
                        _this.snortify.success('Signed-up successfully');
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
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.elementRef.nativeElement.ownerDocument.body.style.background = "url('../../../assets/background.jpg') no-repeat center center fixed";
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundSize = "cover";
    };
    //end of signup
    //Method to validate email
    SignupComponent.prototype.validateEmail = function (mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return (true);
        }
        return (false);
    }; // end of email validation
    //Method to check password using regex
    SignupComponent.prototype.CheckPassword = function (inputtxt) {
        if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(inputtxt)) {
            return true;
        }
        else {
            return false;
        }
    }; // end of password validation
    //Method to check phone number
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
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-signup',
            template: __webpack_require__(/*! ./signup.component.html */ "./src/app/user/signup/signup.component.html"),
            styles: [__webpack_require__(/*! ./signup.component.css */ "./src/app/user/signup/signup.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service_service__WEBPACK_IMPORTED_MODULE_1__["UserServiceService"], ng_snotify__WEBPACK_IMPORTED_MODULE_2__["SnotifyService"], _socket_service_service__WEBPACK_IMPORTED_MODULE_3__["SocketServiceService"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], SignupComponent);
    return SignupComponent;
}());



/***/ }),

/***/ "./src/app/user/user.module.ts":
/*!*************************************!*\
  !*** ./src/app/user/user.module.ts ***!
  \*************************************/
/*! exports provided: UserModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserModule", function() { return UserModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _signup_signup_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./signup/signup.component */ "./src/app/user/signup/signup.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/login.component */ "./src/app/user/login/login.component.ts");
/* harmony import */ var _user_service_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../user-service.service */ "./src/app/user-service.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/http */ "./node_modules/@angular/http/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _password_rest_password_rest_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./password-rest/password-rest.component */ "./src/app/user/password-rest/password-rest.component.ts");
/* harmony import */ var _socket_service_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../socket-service.service */ "./src/app/socket-service.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_http__WEBPACK_IMPORTED_MODULE_6__["HttpModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_10__["RouterModule"].forRoot([
                    { path: 'signup', component: _signup_signup_component__WEBPACK_IMPORTED_MODULE_2__["SignupComponent"] },
                    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"] },
                    { path: 'passwordReset/:resetToken', component: _password_rest_password_rest_component__WEBPACK_IMPORTED_MODULE_8__["PasswordRestComponent"] }
                ])
            ],
            providers: [_user_service_service__WEBPACK_IMPORTED_MODULE_4__["UserServiceService"], _socket_service_service__WEBPACK_IMPORTED_MODULE_9__["SocketServiceService"]],
            declarations: [_signup_signup_component__WEBPACK_IMPORTED_MODULE_2__["SignupComponent"], _login_login_component__WEBPACK_IMPORTED_MODULE_3__["LoginComponent"], _password_rest_password_rest_component__WEBPACK_IMPORTED_MODULE_8__["PasswordRestComponent"]]
        })
    ], UserModule);
    return UserModule;
}());



/***/ })

}]);
//# sourceMappingURL=user-user-module.js.map