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
var io = require("socket.io-client");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var SocketServiceService = /** @class */ (function () {
    function SocketServiceService(http) {
        var _this = this;
        this.http = http;
        this.url = "http://localhost:3000";
        this.sendUserId = function () {
            return rxjs_1.Observable.create(function (observer) {
                _this.socket.on('send-userId', function (data) {
                    observer.next(data);
                });
            });
        }; //  end of send urser Id
        this.check = function () {
            return rxjs_1.Observable.create(function (observer) {
                _this.socket.on('change-made', function (data) {
                    observer.next(data);
                });
            });
        }; //  end of check
        this.refresh = function () {
            return rxjs_1.Observable.create(function (observer) {
                _this.socket.on('refresh', function (data) {
                    observer.next(data);
                });
            });
        }; // end of refresh
        this.newFriend = function () {
            return rxjs_1.Observable.create(function (observer) {
                _this.socket.on('newFriend', function (data) {
                    observer.next(data);
                });
            });
        }; // end of new friend
        this.undoEvent = function () {
            return rxjs_1.Observable.create(function (observer) {
                _this.socket.on('undoEvent', function (data) {
                    observer.next(data);
                });
            });
        }; // end of undoEvent
        // events to emit
        this.userId = function (id) {
            _this.socket.emit('userId', id);
        }; // end of userId
        this.newChange = function (data) {
            _this.socket.emit('newChange', data);
        }; //  end of new change
        this.frndRequestSent = function (data) {
            _this.socket.emit('frndRequestSent', data);
        }; //  end of friend request sent.
        this.requestAccepted = function (data) {
            _this.socket.emit('requestAccepted', data);
        }; //  end of request accepted
        this.sendMail = function (data) {
            _this.socket.emit('mail', data);
        };
        this.undo = function (id) {
            _this.socket.emit('undo', id);
        }; // end of undo
        this.socket = io(this.url);
    } // end of constructor
    SocketServiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], SocketServiceService);
    return SocketServiceService;
}());
exports.SocketServiceService = SocketServiceService;
//# sourceMappingURL=socket-service.service.js.map