"use strict";
exports.__esModule = true;
exports.Survey = void 0;
var Survey = /** @class */ (function () {
    function Survey(id, title, admin, question) {
        this.id = id;
        this.title = title;
        this.admin = admin;
        this.question = question;
    }
    return Survey;
}());
exports.Survey = Survey;
// class SurveysList {
//     SurveryArray: Array<Survey> = [];
//     addSurvey(survey: Survey) {
//         try {
//             this.SurveryArray.push(survey);
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }
