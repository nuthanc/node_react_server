// SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
  { name: 'title', label: 'Survey Title' },
  { name: 'subject', label: 'Subject Line' },
  { name: 'body', label: 'Email body' },
  { name: 'emails', label: 'Recipient List' },
];

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ name, label }) => {
      return (
        <Field
          key={name}
          name={name}
          label={label}
          type="text"
          component={SurveyField}
        />
      );
    });
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit((data) => console.log(data))}>
        {this.renderFields()}
        <Link to="/surveys" className="red left white-text btn-flat">
          Cancel
          <i className="material-icons right">cancel</i>
        </Link>
        <button type="submit" className="teal right white-text btn-flat">
          Next
          <i className="material-icons right">arrow_forward</i>
        </button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.emails = validateEmails(values.emails || '');

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You should provide a value';
    }
  });



  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
})(SurveyForm);
