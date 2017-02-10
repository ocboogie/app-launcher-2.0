System.register(["./greeting"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var greeting_1, greeting;
    return {
        setters: [
            function (greeting_1_1) {
                greeting_1 = greeting_1_1;
            }
        ],
        execute: function () {
            greeting = new greeting_1.default();
            console.log("TEST");
            greeting.hello();
        }
    };
});
//# sourceMappingURL=index.js.map