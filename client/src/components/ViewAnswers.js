import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import EditButton from "./EditButton";
// the scope of the user
let scope = false;
const ViewAnswers = () => {
  const { questionId } = useParams();

  const [answers, setAnswers] = useState([{ answerdescription: "Loading" }]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      } catch (error) {
        console.log("Error fetching products");
      }
    };
    fetchData();
  }, [questionId]);

  // Render a list of answers

  return (
    <>
      <h1>Answers</h1>
      {isLoading && <p className="loading-list-item list-item">Loading....</p>}
      {error && (
        <p className="error-list-item list-item">Oops, something went wrong!</p>
      )}
      <p className="title">{answers[0].questiondescription}</p>
      {answers.map((answer, key) => {
        return (
          <div key={key}>
            <div
              to={"/editanswers/" + answer.answerid}
              className="list-item"
              style={{ pointerEvents: scope ? "" : "none" }}
            >
              {answer.answerdescription}
            </div>
            <EditButton information={answer}>Edit Post</EditButton>
          </div>
        );
      })}
    </>
  );
};

export default ViewAnswers;
