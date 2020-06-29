import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { fetchQuestions } from './redux/trivia';
import { Button } from 'react-native-elements';

class Home extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handlePress.bind(this);
  }

  handlePress(category) {
    this.props.getQuestions(category);

    const { navigate } = this.props.navigation;
    navigate('Questions');
  }

  static navigationOptions = {
    headerShown: false,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Ready to test your trivia skills? </Text>
        <Text style={styles.text}>Select a category </Text>
        <View style={styles.buttonWrapper}>
          <View style={styles.button}>
            <Button
              raised
              title="Geography"
              titleStyle={{ fontFamily: 'Futura', fontStyle: 'italic' }}
              buttonStyle={{
                backgroundColor: '#28a745',
                width: 120,
              }}
              onPress={() => this.handlePress('geography')}
            />
            <Button
              raised
              title="Games"
              titleStyle={{ fontFamily: 'Futura', fontStyle: 'italic' }}
              buttonStyle={{
                backgroundColor: '#dc3545',
                width: 120,
              }}
              onPress={() => this.handlePress('games')}
            />
            <Button
              raised
              title="Animals"
              titleStyle={{ fontFamily: 'Futura', fontStyle: 'italic' }}
              buttonStyle={{
                backgroundColor: '#007bff',
                width: 120,
              }}
              onPress={() => this.handlePress('animals')}
            />
          </View>
          <View style={styles.button}>
            <Button
              raised
              title="Computers"
              titleStyle={{ fontFamily: 'Futura', fontStyle: 'italic' }}
              buttonStyle={{
                backgroundColor: '#6c757d',
                width: 120,
              }}
              onPress={() => this.handlePress('computers')}
            />
            <Button
              raised
              title="History"
              titleStyle={{
                color: 'black',
                fontFamily: 'Futura',
                fontStyle: 'italic',
              }}
              buttonStyle={{
                backgroundColor: '#ffc107',
                width: 120,
              }}
              onPress={() => this.handlePress('history')}
            />
            <Button
              raised
              title="TV"
              titleStyle={{ fontFamily: 'Futura', fontStyle: 'italic' }}
              buttonStyle={{
                backgroundColor: '#17a2b8',
                width: 120,
              }}
              onPress={() => this.handlePress('tv')}
            />
          </View>
          <View style={styles.button}>
            <Button
              raised
              title="Music"
              titleStyle={{ fontFamily: 'Futura', fontStyle: 'italic' }}
              buttonStyle={{
                backgroundColor: '#6A5ACD',
                width: 120,
              }}
              onPress={() => this.handlePress('music')}
            />
            <Button
              raised
              title="Books"
              titleStyle={{
                fontFamily: 'Futura',
                fontStyle: 'italic',
                color: 'black',
              }}
              buttonStyle={{
                backgroundColor: '#FF7F50',
                width: 120,
              }}
              onPress={() => this.handlePress('books')}
            />
            <Button
              raised
              title="Sports"
              titleStyle={{
                fontFamily: 'Futura',
                fontStyle: 'italic',
              }}
              buttonStyle={{
                backgroundColor: '#8B0000',
                width: 120,
              }}
              onPress={() => this.handlePress('sports')}
            />
          </View>
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

const mapDispatch = (dispatch) => ({
  getQuestions: (category) => dispatch(fetchQuestions(category)),
});

export default connect(mapState, mapDispatch)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcccb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    margin: 5,
  },
  button: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  text: {
    fontSize: 20,
    margin: 3,
    fontStyle: 'italic',
    fontFamily: 'Futura',
  },
});
