import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";
import "../css/SurveyList.css";
import '../css/SurveyList.css';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card" key={survey._id}>
            <div class="card-header">
            <p className="card-text blue-text">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
            </div>
          <div className="card-body">
            <h3 className="card-title">{survey.title}</h3>
            <p className="card-text">{survey.body}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><span className="yes-no">Yes:</span>  {survey.yes}</li>
            <li class="list-group-item"><span className="yes-no">No:</span>  {survey.no}</li>
          </ul>
        </div>

      );
    });
  }

  render() {
    return (
      <div>
        {this.renderSurveys()}

      </div>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
