var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  //How can we keep track of User Activity?
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ""
  },
  gender: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: String
  },
  profileImg: {
    type: String
  },
  admin: {
    type: Boolean,
    default: false
  },
  sortedPing: {
    type: Object,
    default: {}
  },
  myActivity: [{type: mongoose.Schema.Types.ObjectId, ref: 'Activity'}],
  myDailyGoal: {
    type: Object,
    default: {
      studyingGoal: 0,
      featingGoal: 0,
      trainingGoal: 0,
      hobbyGoal: 0,
      workingGoal: 0,
      sleepingGoal: 0
    }
  },
  activityStreak: {
    type: Object,
    default: {
      studying: 0,
      eating: 0,
      training: 0,
      hobby: 0,
      working: 0,
      sleeping: 0
    }
  },
  totalHoursLogged: {
    type: Number,
    default: 0
  }
},
{ timestamps: true }
);

var activitySchema = new mongoose.Schema({
  activityCreator: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  activityImages: String,
  activityNote: {
    type: String,
    default: ""
  },
  activityLatitude: {
    type: Number,
    required: true
  },
  activityLongitude: {
    type: Number,
    required: true
  },
  activityCategory:{
    type: String,
    required: true
  },
  activityDuration: {
    type: Number,
    required: true
  },
  activityGoalForThatDay: {
    type: Number
  }
},
{ timestamps: true }
);

var notificationsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Activity'
  },
  actionNumber: {
    type: Number,
    required: true
  }
  },
  { timestamps: true }
);


var User = mongoose.model("User", userSchema);
var Activity = mongoose.model("Activity", activitySchema);
var Usernotification = mongoose.model("Usernotification", notificationsSchema);

module.exports = {
  User: User,
  Activity: Activity,
  Usernotification: Usernotification
};
