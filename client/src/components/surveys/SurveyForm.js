// SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ name, label }) => {
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
      <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
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

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You should provide a value';
    }
  });



  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);
