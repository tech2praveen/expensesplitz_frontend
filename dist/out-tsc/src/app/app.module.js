"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_component_1 = require("./app.component");
var router_1 = require("@angular/router");
var user_module_1 = require("./user/user.module");
var todo_module_1 = require("./todo/todo.module");
var to_do_module_1 = require("./to-do/to-do.module");
var ng_snotify_1 = require("ng-snotify");
var not_found_component_1 = require("./not-found/not-found.component");
var home_component_1 = require("./home/home.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                not_found_component_1.NotFoundComponent,
                home_component_1.HomeComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                ng_snotify_1.SnotifyModule,
                user_module_1.UserModule,
                todo_module_1.TodoModule,
                to_do_module_1.ToDoListModule,
                router_1.RouterModule.forRoot([
                    { path: 'signup', loadChildren: './user/user.module' },
                    { path: 'login', loadChildren: './user/user.module' },
                    { path: 'passwordReset/:resetToken', loadChildren: './user/user.module' },
                    { path: 'todo/:userId', loadChildren: './todo/todo.module' },
                    { path: 'to-do/:userId', loadChildren: './to-do/to-do.module' },
                    { path: 'frnd/:guestUserId/:userId', loadChildren: './todo/todo.module' },
                    { path: 'home', component: home_component_1.HomeComponent },
                    { path: '', component: home_component_1.HomeComponent },
                    { path: '*', component: not_found_component_1.NotFoundComponent },
                    { path: '**', component: not_found_component_1.NotFoundComponent }
                ])
            ],
            providers: [{ provide: 'SnotifyToastConfig', useValue: ng_snotify_1.ToastDefaults },
                ng_snotify_1.SnotifyService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map