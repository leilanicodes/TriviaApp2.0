import { combineReducers } from 'redux';
import triviaReducer from './trivia';

const appReducer = combineReducers({
  results: triviaReducer,
});

export default appReducer;
