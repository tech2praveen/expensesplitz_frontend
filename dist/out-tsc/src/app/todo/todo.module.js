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
var listview_component_1 = require("./listview/listview.component");
var http_1 = require("@angular/common/http");
var http_2 = require("@angular/http");
var forms_1 = require("@angular/forms");
var user_service_service_1 = require("../user-service.service");
var list_service_service_1 = require("../list-service.service");
var modal_module_1 = require("@ng-bootstrap/ng-bootstrap/modal/modal.module");
var ngx_order_pipe_1 = require("ngx-order-pipe");
var router_1 = require("@angular/router");
var TodoModule = /** @class */ (function () {
    function TodoModule() {
    }
    TodoModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_2.HttpModule,
                forms_1.FormsModule,
                ngx_order_pipe_1.OrderModule,
                modal_module_1.NgbModalModule.forRoot(),
                http_1.HttpClientModule,
                router_1.RouterModule.forRoot([
                    { path: 'todo/:userId', component: listview_component_1.ListviewComponent },
                    { path: 'frnd/:guestUserId/:userId', component: listview_component_1.ListviewComponent },
                ])
            ],
            providers: [user_service_service_1.UserServiceService, list_service_service_1.ListServiceService],
            declarations: [listview_component_1.ListviewComponent]
        })
    ], TodoModule);
    return TodoModule;
}());
exports.TodoModule = TodoModule;
//# sourceMappingURL=todo.module.js.map