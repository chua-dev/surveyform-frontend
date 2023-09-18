class FormSubmitModel {
  submitDate: Date;
  surveyAnswers: { question: string; answer: string; }[];
}

class FormAnswer {
  //questionId: string;
  //[key: string]: string;
  //questionId: number;
  //answer: string;
}

export default FormSubmitModel;