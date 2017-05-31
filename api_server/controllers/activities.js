const Activity = require('../models/activity');

exports.postNewActivity = function(req, res, next) {
  // if user does not exists, then craete a new record
  const activity = new Activity(req.body);
  //console.log("Activity body is: ");  // For Debug
  //console.log(req.body);  // For Debug


  activity.save(function(err) {
    // if fails to insert into db
    if(err) { return next(err); }

    // send back a success indications
    res.json({ success: true });
  });
}

exports.addLike = function(req, res, next) {
  pushArrayItem('likes', req, res, next);
}

exports.addComment = function(req, res, next) {
  pushArrayItem('comments', req, res, next);
}

exports.getAllFeeds = function(req, res, next) {
  Activity.find().sort({ createDate: -1 })
    .exec(function(err, activityFeeds) {
      if (err){
        return next(err);
      }
      else{
        res.json(activityFeeds);
      }
    })

}

function pushArrayItem(arrayName, req, res, next) {
  // Create activity object
  const activity = new Activity(req.body);

  // console.log(`${arrayName} body is: `);  // For Debug
  // console.log(req.body);  // For Debug

  const _id = activity._id;
  const item = activity[arrayName][0];
  // console.log(`Item content of ${arrayName} is: `);  // For Debug
  // console.log(item);  // For Debug

  // Check we have required info
  if (!_id || !item){
    return res.status(402).send({ success: false,
      error: `${arrayName} can only be applied on existing post and requires user info`});
  }

  // Locate the required post doc to update
  Activity.findOne(
    { _id: _id }
  ).
    exec(
      function(err, result){
        // Add the current like info the the array
        result[arrayName].push(item);
        // Save
        result.save(function(err){
          // if fails to insert into db
          if(err) { return next(err); }

          // send back a success indications
          res.json({ success: true });
          }
        );
      }
    );
}
