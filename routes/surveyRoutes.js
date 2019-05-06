const _ = require('lodash');
const Path = require('path-parser').default;  // have to now use .default to use this
const url = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');

const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app => {
    //req.user is the current user
    app.get('/api/surveys', requireLogin, async (req, res) => {
        // find all the users that have all the _user properties equal to the current user
        // _user comes from surveySchema
        const surveys = await Survey.find({_user: req.user.id})
            .select({recipients: false });  // do not give us the recipients list with the surveys
        res.send(surveys);
    });



    // charity route
    // req.user is the current user
    //app.get('/api/returnCharity', requireLogin, async (req, res)=> {
        //const charity = await.find({   });
        // res.send(charity);
   // });


    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
        _.chain(req.body)
            .map(({email, url }) => {
                const match = p.test(new URL(url).pathname);
                if(match){
                    return {email, surveyId: match.surveyId, choice: match.choice }
                }
            })
            .compact() // returns only event object
            .uniqBy('email', 'surveyId') // keeps two votes on same email from being recorded more than once

            .each(({ surveyId, email, choice}) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: {email: email, responded: false}
                    }
                },{
                    $inc: { [choice]: 1},
                    $set: {'recipients.$.responded': true},
                    lastResponded: new Date()
                }).exec();
            })
            .value();

        res.send({});
    });



    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title: title,
            subject: subject,
            body: body,
            recipients: recipients.split(',').map(email => ({ email })),
            _user: req.user.id,
            dateSent: Date.now()  // records when we have created(and most likely) sent the survey
        });

        // great place to send an email
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        }catch (err){
            res.status()
        }
    });
};



// can put in as many arguments to any route, but
// put them in the order you want to perform them
// eg. requireCredits requireLogin   wouldn't make sense