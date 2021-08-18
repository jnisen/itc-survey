export { };

export interface Question {
    title: string;
    questionId: string;
    voters: Array<Voter>;
}
export interface Voter {
    voterID: string;
    email:string;
    score: number;
}

export class Survey {
    id:string;
    title: string;
    admin: string;
    question: Array<Question>;

    constructor(id:string,title: string, admin: string, question: Array<Question>) {
        this.id = id;
        this.title = title;
        this.admin = admin;
        this.question = question;
    }

}

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