import { FETCH_NEWS_FEED }
  from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_NEWS_FEED:
      //console.log(action.payload);  // For Debug
      return { ...state, feeds: action.payload };
    default:
      return state;
  }
}
