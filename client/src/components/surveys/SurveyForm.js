// SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class SurveyForm extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit((data) => console.log(data))}>
        <Field name="surveyTitle" type="text" component="input"/>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'surveyForm',
})(SurveyForm);
