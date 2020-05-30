"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var list_service_service_1 = require("./list-service.service");
describe('ListServiceService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [list_service_service_1.ListServiceService]
        });
    });
    it('should be created', testing_1.inject([list_service_service_1.ListServiceService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=list-service.service.spec.js.map