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
var router_1 = require("@angular/router");
var user_service_service_1 = require("../../user-service.service");
var socket_service_service_1 = require("../../socket-service.service");
var ng_snotify_1 = require("ng-snotify");
var ng_snotify_2 = require("ng-snotify");
var PasswordRestComponent = /** @class */ (function () {
    function PasswordRestComponent(userService, router, socketService, _router, snortify) {
        var _this = this;
        this.userService = userService;
        this.router = router;
        this.socketService = socketService;
        this._router = _router;
        this.snortify = snortify;
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
                alert('error has occured, please try again');
            }
            else if (!_this.CheckPassword(_this.password)) {
                // alert('Your password mmust be between 7 to 15 characters which contain at least one numeric digit and a special character.')
                _this.snortify.create({
                    title: "Check",
                    body: "Your password must be between 7 to 15 characters which contain at least one numeric digit and a special character.",
                    config: {
                        position: ng_snotify_2.SnotifyPosition.centerTop,
                        type: 'confirm'
                    }
                });
            }
            else {
                var details = {
                    email: _this.emailReceived,
                    password: _this.password
                };
                _this.userService.updatePassword(details).subscribe(function (response) {
                    // console.log(response);
                    if (response.status === 200) {
                        _this.snortify.success('password changed successfully');
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
        this.getInfoUsingToken(this.token);
    };
    PasswordRestComponent.prototype.CheckPassword = function (inputtxt) {
        // var passw=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(inputtxt)) {
            return true;
        }
        else {
            return false;
        }
    }; // end of password validation
    PasswordRestComponent = __decorate([
        core_1.Component({
            selector: 'app-password-rest',
            templateUrl: './password-rest.component.html',
            styleUrls: ['./password-rest.component.css']
        }),
        __metadata("design:paramtypes", [user_service_service_1.UserServiceService, router_1.Router, socket_service_service_1.SocketServiceService, router_1.ActivatedRoute, ng_snotify_1.SnotifyService])
    ], PasswordRestComponent);
    return PasswordRestComponent;
}());
exports.PasswordRestComponent = PasswordRestComponent;
//# sourceMappingURL=password-rest.component.js.map