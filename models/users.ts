export { };

const fs = require("fs");

export class User {
    username: string;
    email: string;
    password: string;
    surveys: Array<string>;
    answersSurveys: Array<string>;

    constructor(username, email, password, surveys, answersSurveys) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.surveys = surveys;
        this.answersSurveys = answersSurveys;
    }

}


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

