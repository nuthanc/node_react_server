// SurveyField contains logic to render a single
// label and text input
import React from 'react';

const SurveyField = ({ input, label, meta: { touched, error } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};

export default SurveyField;
