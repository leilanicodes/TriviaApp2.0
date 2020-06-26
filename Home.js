import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { fetchQuestions } from './redux/trivia';
import { withRouter, NavLink } from 'react-router-dom';
import { Button } from 'react-native-elements';

class Home extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.getQuestions(event.target.value);
  }

  render() {
    const image = {
      uri:
        'https://static.vecteezy.com/system/resources/previews/000/129/108/non_2x/trivia-papper-background-illustration-vector.jpg',
    };
    return (
      <View>
        <Text>Hello!</Text>
      </View>
      // <View style={styles.container}>
      //   <Text style={styles.text}>Ready to test your trivia skills? </Text>
      //   <Text style={styles.text}>Select a category </Text>
      //   <View style={styles.buttonWrapper}>
      //     <View style={styles.button}>
      //       <NavLink to="/questions">
      //         <Button
      //           raised
      //           title="Geography"
      //           titleStyle={{ fontFamily: 'Futura', fontStyle: 'italic' }}
      //           buttonStyle={{
      //             backgroundColor: '#28a745',
      //             width: 120,
      //           }}
      //         />
      //       </NavLink>
      //       <Button
      //         raised
      //         title="Games"
      //         titleStyle={{ fontFamily: 'Futura', fontStyle: 'italic' }}
      //         buttonStyle={{
      //           backgroundColor: '#dc3545',
      //           width: 120,
      //         }}
      //       />
      //       <Button
      //         raised
      //         title="Animals"
      //         titleStyle={{ fontFamily: 'Futura', fontStyle: 'italic' }}
      //         buttonStyle={{
      //           backgroundColor: '#007bff',
      //           width: 120,
      //         }}
      //       />
      //     </View>
      //     <View style={styles.button}>
      //       <Button
      //         raised
      //         title="Computers"
      //         titleStyle={{ fontFamily: 'Futura', fontStyle: 'italic' }}
      //         buttonStyle={{
      //           backgroundColor: '#6c757d',
      //           width: 120,
      //         }}
      //       />
      //       <Button
      //         raised
      //         title="History"
      //         titleStyle={{
      //           color: 'black',
      //           fontFamily: 'Futura',
      //           fontStyle: 'italic',
      //         }}
      //         buttonStyle={{
      //           backgroundColor: '#ffc107',
      //           width: 120,
      //         }}
      //       />
      //       <Button
      //         raised
      //         title="TV"
      //         titleStyle={{ fontFamily: 'Futura', fontStyle: 'italic' }}
      //         buttonStyle={{
      //           backgroundColor: '#17a2b8',
      //           width: 120,
      //         }}
      //       />
      //     </View>
      //   </View>
      // </View>
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
// export default App;

const styles = StyleSheet.create({
  // image: {
  //   resizeMode: 'cover',
  //   justifyContent: 'center',
  // },

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
    fontSize: 18,
    margin: 3,
    fontStyle: 'italic',
    fontFamily: 'Futura',
  },
});
