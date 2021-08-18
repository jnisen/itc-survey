"use strict";
exports.__esModule = true;
exports.User = void 0;
var fs = require("fs");
var User = /** @class */ (function () {
    function User(username, email, password, surveys, answersSurveys) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.surveys = surveys;
        this.answersSurveys = answersSurveys;
    }
    return User;
}());
exports.User = User;
// const readAllUsers = () => {
//     const allUsers = fs.readFileSync("./models/data/user.json");
//     return JSON.parse(allUsers);
// }
// export class UserList {
//     usersArray: Array<User> = [];
//     constructor(){
//         this.usersArray = readAllUsers()
//     }
//     add(users: User) {
//         try {
//             this.usersArray.push(users);
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }
// module.exports = {
//     User: User,
//     UserList: UserList,
// };
