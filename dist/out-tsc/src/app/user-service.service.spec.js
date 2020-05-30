"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var user_service_service_1 = require("./user-service.service");
describe('UserServiceService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [user_service_service_1.UserServiceService]
        });
    });
    it('should be created', testing_1.inject([user_service_service_1.UserServiceService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=user-service.service.spec.js.map