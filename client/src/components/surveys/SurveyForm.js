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
          label="Suvey Title"
          type="text"
          component={SurveyField}
        />
        <Field
          name="subject"
          label="Subject Line"
          type="text"
          component={SurveyField}
        />
        <Field
          name="body"
          label="Email body"
          type="text"
          component={SurveyField}
        />
        <Field
          name="emails"
          label="Recipient List"
          type="text"
          component={SurveyField}
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
