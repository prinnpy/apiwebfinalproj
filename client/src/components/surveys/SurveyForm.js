// SurveyForm shows a form for a user to add input
import _ from "lodash";
import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";
import "../css/SurveyForm.css";

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div className="survey-form-box bg-light">
        <p className="confirm-text">Enter new survey details</p>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}

              <Link to="/surveys" className="cancel-btn text-left">
                <button className="btn btn-danger btn-lg">Cancel</button>
              </Link>
              <button type="submit" className="btn btn-primary btn-lg next-btn">
                Next >
              </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(formFields, ({ name, noValueErrorMsg }) => {
    if (!values[name]) {
      errors[name] = noValueErrorMsg;
    }
  });

  errors.recipients = validateEmails(values.recipients || "");

  return errors;
}
export default reduxForm({
  validate: validate,
  form: "surveyForm", // how to correctly track the form values
  destroyOnUnmount: false
})(SurveyForm);
