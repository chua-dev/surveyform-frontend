import React, {useState, useReducer, useEffect} from 'react';
import './App.css';
import SurveyForm from './Components/SurveyForm';


const App = () => {
  //const [state, dispatch] = useReducer(formReducer, { questionList: [] });
  const [surveyList, setSurveyList] = useState([]);

  useEffect(() => {
    callApi();
  }, [])


  const callApi = () => {
    fetch("https://localhost:7017/api/SurveyQuestion")
      .then(res => res.json())
      .then(data => {
        setSurveyList(data);
      })
      .catch(error => {
        console.log(error);
      })
  };



  return (
    <div className="form">
        {surveyList ? (
          <SurveyForm surveyList={surveyList} />)
          :
          <p>Loading Form...</p>
        }
    </div>
  );
}

export default App;
