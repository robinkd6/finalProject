var mongoose              = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({

  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
 
});

//take passportlocal mongoose
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);

// var bcrypt = require('bcrypt');

// module.exports = function(sequelize, DataTypes) {
//   var user = sequelize.define('user', {
//     name: DataTypes.STRING,
//     email: {
//       type: DataTypes.STRING,
//       validate: {
//         isEmail: true,
//         notEmpty: true
//       }
//     },
//     password: {
//       type: DataTypes.STRING,
//       validate: {
//         len: [8, 99]
//       }
//     },
//     dob: {
//       type: DataTypes.DATE,
//       validate: {
//         notEmpty: true
//       },
//     }
//   }, {
//     classMethods: {
//       associate: function(models) {
//         models.user.hasMany(models.provider);
//       },
//       authenticate: function(email, password, callback) {
//         this.find({where: {email: email}}).then(function(user) {
//           if (user) {
//             bcrypt.compare(password, user.password, function(err, result) {
//               if (err) {
//                 callback(err);
//               } else {
//                 callback(null, result ? user : false);
//               }
//             });
//           } else {
//             callback(null, false);
//           }
//         }).catch(callback);
//       }
//     },
//     instanceMethods: {
//       checkPassword: function(password, callback){
//         if (password && this.password) {
//           bcrypt.compare(password, this.password, callback);
//         } else {
//           callback(null, false);
//         }
//       }
//     },
//     hooks: {
//       beforeCreate: function(user, options, callback) {
//         if (!user.password) return callback(null, user);
//         bcrypt.hash(user.password, 10, function(err, hash) {
//           if (err) return callback(err);
//           user.password = hash;
//           callback(null, user);
//         });
//       }
//     }
//   });
//   return user;
// };