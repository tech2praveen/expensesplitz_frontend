"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var signup_component_1 = require("./signup/signup.component");
var login_component_1 = require("./login/login.component");
var user_service_service_1 = require("../user-service.service");
var http_1 = require("@angular/common/http");
var http_2 = require("@angular/http");
var forms_1 = require("@angular/forms");
var password_rest_component_1 = require("./password-rest/password-rest.component");
var socket_service_service_1 = require("../socket-service.service");
var router_1 = require("@angular/router");
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_2.HttpModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                router_1.RouterModule.forRoot([
                    { path: 'signup', component: signup_component_1.SignupComponent },
                    { path: 'login', component: login_component_1.LoginComponent },
                    { path: 'passwordReset/:resetToken', component: password_rest_component_1.PasswordRestComponent }
                ])
            ],
            providers: [user_service_service_1.UserServiceService, socket_service_service_1.SocketServiceService],
            declarations: [signup_component_1.SignupComponent, login_component_1.LoginComponent, password_rest_component_1.PasswordRestComponent]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map