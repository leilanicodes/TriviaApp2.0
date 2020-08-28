import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import LoadingView from 'react-native-loading-view';

const { height } = Dimensions.get('window');

export class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      numberCorrect: 0,
      incorrectSelections: [],
      correctSelections: [],
      answeredQuestions: [],
      screenHeight: 0,
      loading: true,
    };
    this.handleChoice = this.handleChoice.bind(this);
  }
  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 500);
  };

  handleChoice(choice, result, id, questionIndex) {
    //checks if the choice selected equals the correct answer
    if (id && choice === result.correct_answer) {
      //adds one to the number of correct answers
      this.setState({ numberCorrect: this.state.numberCorrect + 1 });
      // pushes the correct selection into the correctSelections array
      this.setState({
        correctSelections: [...this.state.correctSelections, id],
      });
    } else {
      //pushes the incorrect selections into the incorrectSelections array
      this.setState({
        incorrectSelections: [...this.state.incorrectSelections, id],
      });
    }
    //pushes the answered questions into the answeredQuestions array
    this.setState({
      answeredQuestions: [...this.state.answeredQuestions, questionIndex],
    });
  }

  checkStyle(id, correctAnswer, choice, questionIndex) {
    // this function allows changing of the background color to green or red based on whether or not the correct answer is selected
    if (this.state.answeredQuestions.includes(questionIndex)) {
      if (correctAnswer === choice) {
        return styles.correct;
      } else if (this.state.incorrectSelections.includes(id)) {
        return styles.incorrect;
      }
    }
    return styles.choice;
  }
  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  render() {
    const results = this.props.results.results;
    const score = this.state.numberCorrect * 10;
    const scrollEnabled = this.state.screenHeight > height;

    return (
      <LoadingView loading={this.state.loading}>
        <SafeAreaView style={styles.container} key={score}>
          {/* //enables scrolling on mobile phone */}
          <ScrollView
            contentContainerStyle={styles.scrollview}
            scrollEnabled={scrollEnabled}
            onContentSizeChange={this.onContentSizeChange}
            key={scrollEnabled + 'scroll'}
          >
            <View style={styles.questionsWrapper} key={results}>
              {/* Mapped through results array to display the questions  */}
              {results &&
                results.length &&
                results.map((result, questionIndex) => (
                  <View style={styles.question} key={result.question}>
                    <Text
                      style={styles.questionText}
                      key={result.question + 'text'}
                    >
                      {questionIndex +
                        1 +
                        '. ' +
                        result.question
                          .replace(/(&quot\;)/g, '"')
                          .replace(/&#039;/g, "'")
                          .replace(/&lt;/g, '<')
                          .replace(/&gt;/g, '>')}
                    </Text>

                    <View
                      style={styles.choiceForm}
                      key={result.question + 'choice'}
                    >
                      {/* maps through the shuffled answers to display the answers */}
                      {result.shuffledAnswers.map((choice, buttonIndex) => (
                        <View key={choice.incorrect_answers}>
                          <TouchableHighlight
                            activeOpacity={1}
                            key={choice + 'highlight'}
                            // if the answered questions includes the question at the specific question index the touchableHighlight will be disabled
                            disabled={
                              this.state.answeredQuestions.includes(
                                questionIndex
                              )
                                ? true
                                : false
                            }
                            underlayColor="transparent"
                            activeOpacity={3}
                            // checks the style where the answer selections are correct or incorrect at the specific questionIndex
                            style={this.checkStyle(
                              questionIndex + '-' + buttonIndex,
                              result.correct_answer,
                              choice,
                              questionIndex
                            )}
                            onPress={() => {
                              //handleChoice is invoked here to determine what the result of the answer given will be
                              this.handleChoice(
                                choice,
                                result,
                                questionIndex + '-' + buttonIndex,
                                questionIndex
                              );
                            }}
                          >
                            <Text
                              //color of text is changed to white based on whether or not the selected answer is correct
                              style={
                                this.state.answeredQuestions.includes(
                                  questionIndex
                                ) && choice === result.correct_answer
                                  ? styles.correctText
                                  : styles.text
                              }
                              key={choice + 'text'}
                            >
                              {/* displays answer choices and replaces some of the html entities */}
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
              <TouchableHighlight
                underlayColor="#17a2b8"
                activeOpacity={1}
                style={styles.alert}
                onPress={() =>
                  //shows your total score on press of the check your score button, along with a short message
                  alert(
                    score < 60
                      ? `Awww shucks, you got a ${
                          score || 0
                        }%. Better luck next time!`
                      : score < 80
                      ? `You got a ${score}%. You're pretty good at this!`
                      : `You've got some mad trivia skills! You got a ${score}%.`
                  )
                }
              >
                <Text style={styles.alertText}>Check Your Score</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LoadingView>
    );
  }
}

// the results array is connected through the redux store so that we can map through it and grab necessary data
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
    margin: 16,
  },
  question: {
    flex: 1,
    maxWidth: 900,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  choice: {
    width: 300,
    height: 40,
    margin: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f79b9b',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.6,
    borderRadius: 2,
  },
  alert: {
    width: 140,
    height: 40,
    margin: 5,
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#17a2b8',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.6,
    borderRadius: 2,
  },
  alertText: {
    color: '#FFFFF0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    fontFamily: 'Futura',
  },
  text: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
  },
  correctText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    color: 'white',
  },
  questionText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
    margin: 20,
  },
  correct: {
    backgroundColor: 'green',
    width: 300,
    height: 40,
    margin: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.6,
    borderRadius: 4,
  },
  incorrect: {
    backgroundColor: 'red',
    width: 300,
    height: 40,
    margin: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.6,
    borderRadius: 2,
  },
});
