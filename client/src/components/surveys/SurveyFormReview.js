// SurveyFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
//import {submitSurvey} from "../../actions";
import '../css/SurveyFormReview.css';



const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {

    const reviewFields = _.map(formFields, ({name, label}) => {
        return(
            <div key={name}>
                <label className="label">{label}</label>
                <div className="review-text">
                    {formValues[name]}
                </div>
            </div>


        );
    });

    return (
        <div className="survey-form-box bg-light">
            <p className="confirm-text">Please confirm your entries</p>
            {reviewFields}
            <button
            className="btn btn-warning btn-lg back-btn" onClick={onCancel}>
                Back
            </button>
            <button
                onClick={() => submitSurvey(formValues, history)}
                className="btn btn-primary btn-lg submit-btn"
            >
                 Send Survey >
            </button>
        </div>
    );
};

function mapStateToProps(state){
    return{ formValues: state.form.surveyForm.values };  // how we access the values of the form in the confirmform values

}
export default connect(mapStateToProps, actions) (withRouter(SurveyFormReview));
// when mapStateToProps is passed to the connect function
// whatever we return will show up as props to our component