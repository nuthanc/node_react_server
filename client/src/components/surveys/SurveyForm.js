// SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import SurveyField from './SurveyField';

const FIELDS = [
  { name: 'title', label: 'Survey Title' },
  { name: 'subject', label: 'Subject Line' },
  { name: 'body', label: 'Email body' },
  { name: 'emails', label: 'Recipient List' },
];
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
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
    }
      
    );
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
  if(!values.title) {
    errors.title = 'You must provide a title'
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
})(SurveyForm);
