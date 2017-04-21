const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

// Define user info object to be used repeatedly in schema
const userInfo = {
  userName: { type: String, lowercase: true },
    userFullName: String,
    userEmail: { type: String, lowercase: true}
  };

// Define  model
const activitySchema = new Schema({
  createDate: { required: true, type: Date, default: Date.now },
  user: userInfo,
  type: { type: String,
          enum: {
            values: ['Vote', 'Post', 'Comment'],
            message: 'enum validator failed for path `{PATH}` with value `{VALUE}`' } },
  value: { type: Number, required: false },
  message: { type: String, required: false },
  likes: [{ likeDate: { type: Date, default: Date.now },
            user: userInfo }],
  attachment: Buffer,
  comments: [{
    createDate: { required: true, type: Date, default: Date.now },
    user: userInfo,
    message: { type: String, required: false },
    }]
  });

// Create the model class - this will load the model into mongo
// i.e will create a collection named 'users' with the schema of userSchema
const ModelClass = mongoose.model('activities', activitySchema);

// Export the model
module.exports = ModelClass;
