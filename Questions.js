import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import ScoreModal from './Modal';

export class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      numberCorrect: 0,
    };
    this.handleChoice = this.handleChoice.bind(this);
  }

  handleChoice(choice, result, buttonId) {
    let button = document.getElementById(buttonId);

    if (button && choice === result.correct_answer) {
      this.setState({ numberCorrect: this.state.numberCorrect + 1 });
      button.style.backgroundColor = 'green';
      button.style.color = 'white';
      button.disabled = true;
    } else {
      button.style.backgroundColor = 'red';
    }
    for (let i = 0; i < 4; i++) {
      let id = buttonId[0] + '-' + i;
      let element = document.getElementById(id);

      this.markCorrectAnswer(element, result.correct_answer);
      element.disabled = true;
    }
  }

  markCorrectAnswer(element, correctAnswer) {
    if (
      element.innerHTML === correctAnswer ||
      element.getAttribute('choice') === correctAnswer
    ) {
      element.style.backgroundColor = 'green';
    }
  }

  render() {
    const results = this.props.results.results;

    return (
      <div>
        <nav>
          <NavLink to="/">Back to Categories</NavLink>
        </nav>

        <div className="questions-wrapper trivia" key={results}>
          {results && results.length
            ? results.map((result, questionIndex) => (
                <div className="question" key={result.question}>
                  <h2>
                    {questionIndex +
                      1 +
                      '. ' +
                      result.question
                        .replace(/(&quot\;)/g, '"')
                        .replace(/&#039;/g, "'")
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')}
                  </h2>

                  <form id="choice-form">
                    {result.shuffledAnswers.map((choice, buttonIndex) => (
                      <div key={choice.incorrect_answers}>
                        <button
                          disabled={false}
                          type="button"
                          className="choice"
                          choice={choice}
                          dangerouslySetInnerHTML={{ __html: choice }}
                          id={questionIndex + '-' + buttonIndex}
                          onClick={() => {
                            this.handleChoice(
                              choice,
                              result,
                              questionIndex + '-' + buttonIndex
                            );
                          }}
                        />
                      </div>
                    ))}
                  </form>
                </div>
              ))
            : 'A category has not been selected yet.'}
          <ScoreModal
            buttonLabel="Check Your Score"
            score={this.state.numberCorrect * 10}
          />
        </div>
      </div>
    );
  }
}

const mapState = (reduxState) => {
  return {
    results: reduxState.results,
  };
};

export default withRouter(connect(mapState)(Questions));
