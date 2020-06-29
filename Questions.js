import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import ScoreModal from './Modal';

export class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      numberCorrect: 0,
      incorrectSelections: [],
      correctSelections: [],
      answeredQuestions: [],
    };
    this.handleChoice = this.handleChoice.bind(this);
  }

  handleChoice(choice, result, id, questionIndex) {
    // event.preventDefault();

    if (id && choice === result.correct_answer) {
      this.setState({ numberCorrect: this.state.numberCorrect + 1 });

      this.setState({
        correctSelections: [...this.state.correctSelections, id],
      });
    } else {
      this.setState({
        incorrectSelections: [...this.state.incorrectSelections, id],
      });
    }

    this.setState({
      answeredQuestions: [...this.state.answeredQuestions, questionIndex],
    });
  }

  checkStyle(id, correctAnswer, choice, questionIndex) {
    if (this.state.answeredQuestions.includes(questionIndex)) {
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
    const score = this.state.numberCorrect * 10;

    return (
      <View style={styles.container}>
        <View style={styles.questionsWrapper} key={results}>
          {results &&
            results.length &&
            results.map((result, questionIndex) => (
              <View style={styles.question} key={result.question}>
                {/* <ScrollView vertical={true} style={{ flex: 1 }}> */}
                <Text style={styles.text}>
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
                          this.state.answeredQuestions.includes(questionIndex)
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
                        <Text style={styles.text}>
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
                {/* </ScrollView> */}
              </View>
            ))}
        </View>
        <Button
          title="Check Your Score"
          onPress={() => alert(`You got a ${score}%`)}
        />
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
    justifyContent: 'center',
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
    width: 300,
    height: 20,
    margin: 3,
    backgroundColor: '#f79b9b',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 1.0,
    borderRadius: 2,
  },
  text: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
  },
  correct: {
    backgroundColor: 'green',
    color: 'white',
    width: 300,
    margin: 3,
  },
  incorrect: {
    backgroundColor: 'red',
    width: 300,
    margin: 3,
  },
});
