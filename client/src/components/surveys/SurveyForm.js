// SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import SurveyField from './SurveyField';

class SurveyForm extends Component {
  renderFields() {
    return (
      <div>
        <Field
          name="title"
          type="text"
          component={SurveyField}
          placeholder="Title"
        />
      </div>
    );
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit((data) => console.log(data))}>
        {this.renderFields()}
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'surveyForm',
})(SurveyForm);
