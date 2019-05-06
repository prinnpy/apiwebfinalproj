import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from "./surveys/SurveyList";
import './css/Dashboard.css';

const Dashboard = () => {
    return (
        <div className="bg-light campaign-box">
            <div className="add-btn sticky-top">
                <Link to="/surveys/new"  className="">
                    <button className="btn btn-primary btn-lg">+ Add Campaign</button>
                    
                </Link>
            </div>

            <SurveyList/>
        </div>
    );
};

export default Dashboard;
/////