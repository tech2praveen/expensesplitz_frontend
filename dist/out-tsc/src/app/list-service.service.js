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
var ListServiceService = /** @class */ (function () {
    function ListServiceService(_http) {
        var _this = this;
        this._http = _http;
        this.authToken = ng2_cookies_1.Cookie.get('authToken');
        this.url = "http://localhost:3000/api/v1/list";
        this.getAllListOfUser = function (userId) {
            var details = {
                userId: userId
            };
            return _this._http.post(_this.url + "/getAll?authToken=" + _this.authToken, details);
        }; // end of  get all lists of user
        this.updateListUsingListId = function (details) {
            return _this._http.post(_this.url + "/updateList/id?authToken=" + _this.authToken, details);
        }; // end of update list using Id
        this.createNewList = function (details) {
            return _this._http.post(_this.url + "/create?authToken=" + _this.authToken, details);
        }; // end of create new list
        this.deleteList = function (details) {
            return _this._http.post(_this.url + "/delete?authToken=" + _this.authToken, details);
        }; // en of deleteList
        this.updateAllListsOfUser = function (details) {
            return _this._http.post(_this.url + "/update/allLists?authToken=" + _this.authToken, details);
        }; // end of update all list of user
        this.deleteAllListsOfUser = function (details) {
            return _this._http.post(_this.url + "/allList/delete?authToken=" + _this.authToken, details);
        }; // end of delete all lusts of user
    }
    ListServiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], ListServiceService);
    return ListServiceService;
}());
exports.ListServiceService = ListServiceService;
//# sourceMappingURL=list-service.service.js.map