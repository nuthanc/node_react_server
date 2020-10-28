import React from 'react';
import { connect } from 'react-redux';

const SurveyFormReview = ({ onCancel, formValues }) => {
  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>
        {/* The below of Object entries is my implementation */}
        {
          Object.entries(formValues).map(([key, value]) => {
            return <p>{key}: {value}</p>
          })
        }
      </div>
      <button onClick={onCancel} className="yellow darken-3 btn-flat">
        Back
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { formValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps)(SurveyFormReview);
