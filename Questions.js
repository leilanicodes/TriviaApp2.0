import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
} from 'react-native';
import { Button } from 'react-native-elements';
import { greaterThan } from 'react-native-reanimated';
// import ScoreModal from './Modal';

export class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      numberCorrect: 0,
      correctIds: [],
      incorrectSelections: [],
      correctSelections: [],
      disabledChoices: [],
    };
    this.handleChoice = this.handleChoice.bind(this);
  }

  handleChoice(choice, result, id, questionIndex) {
    event.preventDefault();

    if (id && choice === result.correct_answer) {
      this.setState({ numberCorrect: this.state.numberCorrect + 1 });
      this.setState({ correctIds: [...this.state.correctIds, id] });
      this.setState({
        correctSelections: [...this.state.correctSelections, id],
      });
    } else {
      this.setState({
        incorrectSelections: [...this.state.incorrectSelections, id],
      });
    }
    this.setState({
      disabledChoices: [...this.state.disabledChoices, questionIndex],
    });
  }

  checkStyle(id, correctAnswer, choice, questionIndex) {
    if (this.state.disabledChoices.includes(questionIndex)) {
      if (correctAnswer === choice) {
        return styles.correct;
      } else if (this.state.incorrectSelections.includes(id)) {
        return styles.incorrect;
      }
    }
    return styles.choice;
  }

  render() {
    const results = this.props.results.results;

    return (
      <View style={styles.container}>
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
                      <TouchableHighlight
                        disabled={
                          this.state.disabledChoices.includes(questionIndex)
                            ? true
                            : false
                        }
                        activeOpacity={1}
                        style={this.checkStyle(
                          questionIndex + '-' + buttonIndex,
                          result.correct_answer,
                          choice,
                          questionIndex
                        )}
                        onPress={() => {
                          this.handleChoice(
                            choice,
                            result,
                            questionIndex + '-' + buttonIndex,
                            questionIndex
                          );
                        }}
                      >
                        <Text>
                          {choice
                            .replace(/&quot;/g, '"')
                            .replace(/&#039;/g, "'")
                            .replace(/&lt;/g, '<')
                            .replace(/&gt;/g, '>')
                            .replace(/&lrm;/g, '')
                            .replace(/&oacute;/g, 'ó')}
                        </Text>
                      </TouchableHighlight>
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
  container: {
    backgroundColor: '#ffcccb',
  },
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
    backgroundColor: '#f79b9b',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 1.0,
  },
  correct: {
    backgroundColor: 'green',
    color: 'white',
    width: 250,
    margin: 3,
  },
  incorrect: {
    backgroundColor: 'red',
    width: 250,
    margin: 3,
  },
});
