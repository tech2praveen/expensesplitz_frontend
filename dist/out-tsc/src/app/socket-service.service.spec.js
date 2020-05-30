"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var socket_service_service_1 = require("./socket-service.service");
describe('SocketServiceService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [socket_service_service_1.SocketServiceService]
        });
    });
    it('should be created', testing_1.inject([socket_service_service_1.SocketServiceService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=socket-service.service.spec.js.map