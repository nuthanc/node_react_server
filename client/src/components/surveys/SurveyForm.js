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
class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ name, label }) => (
      <Field
        key={name}
        name={name}
        label={label}
        type="text"
        component={SurveyField}
      />
    ));
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

export default reduxForm({
  form: 'surveyForm',
})(SurveyForm);
