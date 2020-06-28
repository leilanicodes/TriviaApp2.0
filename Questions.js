import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
// import ScoreModal from './Modal';

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
      <View style={styles.container}>
        {/* <nav>
          <NavLink to="/">Back to Categories</NavLink>
        </nav> */}

        <View style={styles.questionsWrapper} key={results}>
          {results &&
            results.length &&
            results.map((result, questionIndex) => (
              <View style={styles.question} key={result.question}>
                <Text>
                  {questionIndex +
                    1 +
                    '. ' +
                    result.question
                      .replace(/(&quot\;)/g, '"')
                      .replace(/&#039;/g, "'")
                      .replace(/&lt;/g, '<')
                      .replace(/&gt;/g, '>')}
                </Text>

                <View style={styles.choiceForm}>
                  {result.shuffledAnswers.map((choice, buttonIndex) => (
                    <View key={choice.incorrect_answers}>
                      <Button
                        disabled={false}
                        style={styles.choice}
                        title={choice
                          .replace(/&quot;/g, '"')
                          .replace(/&#039;/g, "'")
                          .replace(/&lt;/g, '<')
                          .replace(/&gt;/g, '>')
                          .replace(/&lrm;/g, '')
                          .replace(/&oacute;/g, 'ó')}
                        // dangerouslySetInnerHTML={{ __html: choice }}
                        id={questionIndex + '-' + buttonIndex}
                        onPress={() => {
                          this.handleChoice(
                            choice,
                            result,
                            questionIndex + '-' + buttonIndex
                          );
                        }}
                      />
                    </View>
                  ))}
                </View>
              </View>
            ))}
          {/* <ScoreModal
            buttonLabel="Check Your Score"
            score={this.state.numberCorrect * 10}
          /> */}
        </View>
      </View>
    );
  }
}

const mapState = (reduxState) => {
  return {
    results: reduxState.results,
  };
};

export default connect(mapState)(Questions);

const styles = StyleSheet.create({
  choiceForm: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  questionsWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  question: {
    maxWidth: 900,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  choice: {
    width: 250,
    margin: 3,
  },
});
