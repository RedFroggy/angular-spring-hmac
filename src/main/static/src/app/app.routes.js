"use strict";
const router_1 = require("@angular/router");
const login_1 = require("./login/login");
const users_1 = require("./users/users");
const user_1 = require("./users/user");
exports.routes = [
    { path: 'authenticate', component: login_1.Login },
    { path: 'users', component: users_1.Users, },
    { path: 'user/:id', component: user_1.User, },
    { path: '', component: login_1.Login }
];
exports.RoutesModule = router_1.RouterModule.forRoot(exports.routes);
//# sourceMappingURL=app.routes.js.map