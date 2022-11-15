import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import EditButton from "./EditButton";
import { useNavigate } from "react-router-dom";

const ViewAnswers = () => {
  const { questionId } = useParams();
  const [answers, setAnswers] = useState([{ answerdescription: "Loading" }]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_API_URL}/answers/${questionId}`
      );
      // fetch error handling
      if (result.ok === false) {
        setError(true);
        return;
      }
      setIsLoading(false);
      const data = await result.json();
      setAnswers(data);
    };
    fetchData();
  }, [questionId]);

  const handleClick = () => {
    navigate(`/postanswer/${questionId}`);
  };
  if (error) {
    return (
      <p className="error-list-item list-item">Oops, something went wrong!</p>
    );
  }

  // Render a list of answers

  return (
    <>
      <h1>Answers</h1>
      {isLoading && <p className="loading-list-item list-item">Loading....</p>}

      <p className="title">{answers[0].questiondescription}</p>

      {answers[0].answerdescription === null ? (
        <></>
      ) : (
        answers.map((answer, key) => {
          return (
            <div key={key} className="list-item main-container">
              <div className="link">
                {answer.isstarred === true ? " ✅ " : ""}
                {answer.answerdescription}
              </div>
              <EditButton information={answer} className="link" />
            </div>
          );
        })
      )}
      <button onClick={handleClick} className="list-item">
        POST NEW ANSWER
      </button>
    </>
  );
};

export default ViewAnswers;
