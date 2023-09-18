import React, { useState } from 'react';
import FormSubmitModel from '../Class/FormSubmitModel';
import './Form.css';

interface FormProps {
  surveyList: any[];
}

const SurveyForm = (props: FormProps) => {
  const surveyList = props.surveyList;
  //const [formInputValues, setFormInputValues] = useState<{ [key: string]: string }>({});

  // Initialize Empty Form
  const myForm = new FormSubmitModel();
  myForm.surveyAnswers = [];

  // Initialize InputState
  const formInputState: {[key: string]: string} = {};
  surveyList.forEach(question => {
    formInputState[question.question] = '';
  })

  const [formInputValues, setFormInputValues] = useState<{[key: string]: string}>(formInputState);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [submitResponse, setSubmitResponse] = useState<string>("");



  const handleInputChange = (event: any) => {
    setFormInputValues({...formInputValues, [event.target.name]: event.target.value});
  }

  const resetInputValues = () => {
    setFormInputValues({});
  }

  const submitSurvey = async (event: any) => {
    event.preventDefault();

    myForm.submitDate = new Date();
    myForm.surveyAnswers = Object.entries(formInputValues).map(([question, answer]) =>({
      question,
      answer
    }));

    console.log("My Form")
    console.log(myForm)

    console.log("My JSON stringify")
    console.log(JSON.stringify(myForm))

    

    try {
      const response = await fetch('https://localhost:7017/api/Survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(myForm)
      });

      if (response.ok) {
        console.log("Success")
        setIsSubmit(true)
        setSubmitResponse("Submit Successfully")
        setFormInputValues(formInputState)
        console.log(response)
      } else {
        console.log("Post request fail")
        setIsSubmit(true)
        setSubmitResponse("Submit Fail!")
        setFormInputValues(formInputState)
        console.log(response)
      }
    } catch (error) {
      console.log(error);
    }

    
  } 

  return(
    <form className="form-list" onSubmit={submitSurvey}>
      <h3 className='bold'>Your Opinion Matters</h3>
      {surveyList.map((survey: any) => (
        <label key={survey.id}>
          {survey.question}
          <input 
            type="text"
            id={survey.question}
            name={survey.question}
            onChange={handleInputChange}
            value={formInputValues[survey.question]}
            ></input>
            <span className="error"></span>
        </label>
      ))}
      <div className={isSubmit ? '' : 'hidden'}>{submitResponse}</div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SurveyForm;