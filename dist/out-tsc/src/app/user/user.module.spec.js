"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_module_1 = require("./user.module");
describe('UserModule', function () {
    var userModule;
    beforeEach(function () {
        userModule = new user_module_1.UserModule();
    });
    it('should create an instance', function () {
        expect(userModule).toBeTruthy();
    });
});
//# sourceMappingURL=user.module.spec.js.map