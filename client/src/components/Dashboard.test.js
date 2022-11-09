/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router } from "react-router-dom";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

/** HAPPY Paths - if server able to fetch data using API,
 */
it("renders questions data using fakeQuestionsData", async () => {
  const fakeQuestionsData = [
    [
      {
        id: 1,
        description: "What is HTML?",
        isstarred: false,
        isreviewed: false,
        topicid: 1,
      },
      {
        id: 2,
        questiondesc: "What is CSS?",
        isstarred: false,
        isreviewed: false,
        topicid: 2,
      },
    ],
    [],
  ];

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeQuestionsData, []),
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(
      <Router>
        <Dashboard />
      </Router>,
      container
    );
  });

  const questionButton = container.querySelector(".question-list-item");
  expect(questionButton.textContent).toBe("What is HTML?");
  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});

it("renders answers data using fakeAnswersData", async () => {
  const fakeAnswersData = [
    [],
    [
      {
        id: 3,
        questionid: 1,
        questiondescription: "What is HTML?",
        answerdescription:
          "Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.",
        isstarred: false,
        isreviewed: false,
      },
      {
        id: 2,
        questionid: 1,
        questiondescription: "What is HTML?",
        answerdescription:
          "Aut quibusdam incidunt ea error aliquam 33 atque odio At corrupti Quis et recusandae impedit sit exercitationem distinctio.",
        isstarred: false,
        isreviewed: false,
      },
      {
        id: 1,
        questionid: 1,
        questiondescription: "What is HTML?",
        answerdescription:
          "Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.",
        isstarred: false,
        isreviewed: false,
      },
    ],
  ];

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeAnswersData),
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(
      <Router>
        <Dashboard />
      </Router>,
      container
    );
  });

  const answerButton = container.querySelector(".answer-list-item");
  expect(answerButton.textContent).toBe(
    "Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur."
  );
  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});

it("renders questions & answers data using fakeQuestionsAnswersData", async () => {
  const fakeQuestionsAnswersData = [
    [
      {
        id: 1,
        description: "What is HTML?",
        isstarred: false,
        isreviewed: false,
        topicid: 1,
      },
      {
        id: 2,
        questiondesc: "What is CSS?",
        isstarred: false,
        isreviewed: false,
        topicid: 2,
      },
    ],
    [
      {
        id: 3,
        questionid: 1,
        questiondescription: "What is HTML?",
        answerdescription:
          "Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.",
        isstarred: false,
        isreviewed: false,
      },
      {
        id: 2,
        questionid: 1,
        questiondescription: "What is HTML?",
        answerdescription:
          "Aut quibusdam incidunt ea error aliquam 33 atque odio At corrupti Quis et recusandae impedit sit exercitationem distinctio.",
        isstarred: false,
        isreviewed: false,
      },
      {
        id: 1,
        questionid: 1,
        questiondescription: "What is HTML?",
        answerdescription:
          "Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.",
        isstarred: false,
        isreviewed: false,
      },
    ],
  ];

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeQuestionsAnswersData),
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(
      <Router>
        <Dashboard />
      </Router>,
      container
    );
  });

  const questionButton = container.querySelector(".question-list-item");
  expect(questionButton.textContent).toBe("What is HTML?");

  const answerButton = container.querySelector(".answer-list-item");
  expect(answerButton.textContent).toBe(
    "Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur."
  );
  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});

/** UNHAPPY Path - if server is down or API fetch fails,
it need to display "Oops, something went wrong!" error message 
*/
it(`renders "Oops, something went wrong!" unable to fetch data from api`, async () => {
  //Mock an unsuccesful fetch response (ie status 500, internal server error)
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      ok: false,
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(
      <Router>
        <Dashboard />
      </Router>,
      container
    );
  });

  let errorMessage = container.querySelector(".error-list-item");
  expect(errorMessage.textContent).toBe("Oops, something went wrong!");

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
