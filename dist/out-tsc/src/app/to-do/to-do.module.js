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
var todo_list_component_1 = require("./todo-list/todo-list.component");
var http_1 = require("@angular/common/http");
var http_2 = require("@angular/http");
var forms_1 = require("@angular/forms");
var modal_module_1 = require("@ng-bootstrap/ng-bootstrap/modal/modal.module");
var ngx_order_pipe_1 = require("ngx-order-pipe");
var router_1 = require("@angular/router");
var ng_sidebar_1 = require("ng-sidebar");
var ng_selectize_1 = require("ng-selectize");
var angular_tree_component_1 = require("angular-tree-component");
var ToDoListModule = /** @class */ (function () {
    function ToDoListModule() {
    }
    ToDoListModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                http_2.HttpModule,
                forms_1.FormsModule,
                ngx_order_pipe_1.OrderModule,
                modal_module_1.NgbModalModule.forRoot(),
                http_1.HttpClientModule,
                ng_selectize_1.NgSelectizeModule,
                ng_sidebar_1.SidebarModule.forRoot(),
                angular_tree_component_1.TreeModule.forRoot(),
                router_1.RouterModule.forRoot([
                    { path: 'to-do/:userId', component: todo_list_component_1.TodoListComponent },
                    { path: 'frnd-todo/:guestUserId/:userId', component: todo_list_component_1.TodoListComponent },
                ])
            ],
            declarations: [todo_list_component_1.TodoListComponent]
        })
    ], ToDoListModule);
    return ToDoListModule;
}());
exports.ToDoListModule = ToDoListModule;
//# sourceMappingURL=to-do.module.js.map