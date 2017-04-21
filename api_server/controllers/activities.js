const Activity = require('../models/activity');

exports.postNewActivity = function(req, res, next) {
  // if user does not exists, then craete a new record
  const activity = new Activity(req.body);
  console.log("Activity body is:");
  console.log(req.body);


  activity.save(function(err) {
    // if fails to insert into db
    if(err) { return next(err); }

    // send back a success indications
    res.json({ success: true });
  });
}
