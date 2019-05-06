// SurveyField contains logic to render a single
// label and text input

import React from 'react';
import '../css/SurveyField.css';

export default ({ input, label, meta: {error, touched} }) => {
    return (
        <div className="form-group">
            <label className="label">{label}</label>
            <input className="form-control" {...input}/>
            <small className="red-text">
                 {touched && error}
            </small>
        </div>
    );
};