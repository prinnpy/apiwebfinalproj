import React from "react";
import "./css/Landing.css";

const Landing = () => {
  return (
    <div>
      <div className="box text-center">
        <h1 className="title display-1">OnSurvey</h1>
        <p className="subtitle">
          Best solution for business owners to recieve feedback from customers
          via surveys
        </p>
        <a
          className="btn btn-primary btn-lg btn-google"
          href="/auth/google"
          role="button"
        >
          Login With Google
        </a>
      </div>

      <div className="box bg-primary text-center">
        <h1 className="title-white display-1">ONLY $1</h1>
        <p className="subtitle-white">
          per survey campaign.
        </p>
        <p className="subtitle-white">
          Most affordable price for entrepreneurs or business owners on a budget!
        </p>
      </div>

      <div className="box bg-light text-center">
        <h1 className="title display-1">Painless & Secure</h1>
        <p className="subtitle">
          We make sure that our service is Fast, Easy, but most importantly secure. We make sure that your customers data will not be shared or misused in anyway.
        </p>
        <a
          className="btn btn-primary btn-lg btn-google"
          href="/auth/google"
          role="button"
        >
          Login With Google
        </a>
      </div>

      <div className="box text-center">
        <h1 className="title display-1">Our Mission</h1>
        <p className="subtitle">
          We know that customers' feedbacks are crutial for businesses. That's why we created OnSurvey. We want business owners to have the most painless experience sending mass surveys to customers.
        </p>
      </div>


    </div>
  );
};

export default Landing;
