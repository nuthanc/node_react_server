// SurveyNew shows SurveyForm and SurveyFormshowFormReview
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

export class SurveyNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return <SurveyFormReview />;
    }
    return <SurveyForm onSurveySubmit={() => this.setState({showFormReview: true})} />;
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default SurveyNew;
