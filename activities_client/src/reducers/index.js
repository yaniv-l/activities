import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import activitiesReducer from './activities_reducer';

const rootReducer = combineReducers({
  form,  // es6 sugar, equal to: 'form: form'
  auth: authReducer,
  activities: activitiesReducer
});

export default rootReducer;
