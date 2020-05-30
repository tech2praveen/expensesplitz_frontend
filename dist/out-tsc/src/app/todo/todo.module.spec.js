"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var todo_module_1 = require("./todo.module");
describe('TodoModule', function () {
    var todoModule;
    beforeEach(function () {
        todoModule = new todo_module_1.TodoModule();
    });
    it('should create an instance', function () {
        expect(todoModule).toBeTruthy();
    });
});
//# sourceMappingURL=todo.module.spec.js.map