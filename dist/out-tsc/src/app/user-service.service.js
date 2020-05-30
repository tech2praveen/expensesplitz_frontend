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
var http_1 = require("@angular/common/http");
var ng2_cookies_1 = require("ng2-cookies/ng2-cookies");
var UserServiceService = /** @class */ (function () {
    function UserServiceService(_http) {
        var _this = this;
        this._http = _http;
        this.authToken = ng2_cookies_1.Cookie.get('authToken');
        this.url = "http://localhost:3000/api/v1/users";
        this.signUpFunction = function (signupDetails) {
            return _this._http.post(_this.url + "/signup", signupDetails);
        }; //  end of signup function
        this.loginFunction = function (loginDetails) {
            return _this._http.post(_this.url + "/login", loginDetails);
        }; //  end of login function
        this.setUserInfoInLocalStorage = function (data) {
            localStorage.setItem('userInfo', JSON.stringify(data));
        }; //  end of set user info
        this.getUserInfoInLocalStorage = function () {
            return JSON.parse(localStorage.getItem('userInfo'));
        }; // end of get user info from local storage
        this.getUserDetails = function (details) {
            return _this._http.post(_this.url + "/getUser", details);
        }; // end of get user details
        this.UpdateUser = function (details) {
            return _this._http.post(_this.url + "/update", details);
        }; // end of update user
        this.updateList = function (details) {
            return _this._http.post(_this.url + "/updateList", details);
        }; // end of update list
        this.updateIndex = function (details) {
            return _this._http.post(_this.url + "/indexUpdate", details);
        }; // end of update Index
        this.getUserDetailsUsingEmail = function (details) {
            return _this._http.post(_this.url + "/email/getUserDetails", details);
        };
        this.sendFrndRequest = function (details) {
            return _this._http.post(_this.url + "/add/frndRequest?authToken=" + _this.authToken, details);
        }; // end of send frund request
        this.moveUser = function (details) {
            return _this._http.post(_this.url + "/move?authToken=" + _this.authToken, details);
        }; // end of move user
        this.getAllUsers = function () {
            return _this._http.get(_this.url + "/getAll?authToken=" + _this.authToken);
        }; //  end of get All users
        this.updateUserUsingEmail = function (details) {
            return _this._http.post(_this.url + "/using/email/updateUser", details);
        }; // end of update user using email
        this.getInfoUsingToken = function (token) {
            return _this._http.get(_this.url + "/getinfo/using/token/" + token);
        }; //end of get user info using token
        this.updatePassword = function (details) {
            return _this._http.post(_this.url + "/password/update", details);
        }; //end of update password
    } //  end of constructor
    UserServiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], UserServiceService);
    return UserServiceService;
}()); // end of class user service
exports.UserServiceService = UserServiceService;
//# sourceMappingURL=user-service.service.js.map