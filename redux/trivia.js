import axios from 'axios';

const SET_TRIVIA = 'SET_TRIVIA';

const setTrivia = (results) => {
  return {
    type: SET_TRIVIA,
    results,
  };
};

export default function triviaReducer(trivia = [], action) {
  switch (action.type) {
    case SET_TRIVIA: {
      return action.results;
    }

    default:
      return trivia;
  }
}

export const fetchQuestions = (category) => {
  return async (dispatch) => {
    let categoryIdsObject = {
      geography: 22,
      computers: 18,
      history: 23,
      games: 15,
      tv: 14,
      animals: 27,
      music: 12,
      books: 10,
      sports: 21,
    };

    let categoryId = categoryIdsObject[category];

    try {
      const { data } = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=medium&type=multiple`
      );

      const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());
      data.results.forEach((result) => {
        let shuffledArr = shuffle([
          ...result.incorrect_answers,
          result.correct_answer,
        ]);

        result.shuffledAnswers = shuffledArr;
      });

      dispatch(setTrivia(data));
    } catch (err) {
      console.log('Error fetching geography trivia', err);
    }
  };
};
