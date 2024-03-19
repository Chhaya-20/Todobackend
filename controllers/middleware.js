const jwt = require("jsonwebtoken");
const User = require("../model/User");

// exports.fetchUser = (req, res) => {

//   const token = req.headers.authorization.split(' ')[1];
//   jwt.verify(token, 'your_secret_key', (err, decodedToken) => {
//     if (err) {

//       return res.status(401).json({ success: false, message: 'Unauthorized' });
//     } else {

//       const userId = decodedToken.userId;
//       const result = User.findbyId(userId);
//       if(result)
//       {
//         req.user=result;
//         return res.status(200).json({ success: true, user: user });
//       }
//       else{
//         return res.status(404).json({ success: false, message: 'User not found' });
//       }
//     //   User.findById(userId, (err, user) => {
//     //     if (err || !user) {
//     //       return res.status(404).json({ success: false, message: 'User not found' });
//     //     } else {

//     //       return res.status(200).json({ success: true, user: user });
//     //     }
//     //   });
//     }
//   });
// };
// const jwt = require('jsonwebtoken');
// const User = require('../model/User');

// exports.fetchUser = (req, res) => {
//   const token = req.headers.authorization.split(' ')[1];

//   jwt.verify(token, 'your_secret_key')
//     .then(decodedToken => {
//       const userId = decodedToken.userId;
//       return User.findById(userId).exec(); // Return a promise
//     })
//     .then(user => {
//       if (!user) {
//         return res.status(404).json({ success: false, message: 'User not found' });
//       }
//       return res.status(200).json({ success: true, user: user });
//     })
//     .catch(err => {
//       return res.status(401).json({ success: false, message: 'Unauthorized' });
//     });
// };

// exports.fetchUser = (req, res) => {
//   const token = req.headers.authorization; // Assuming the token is included in the Authorization header
//   console.log(token);
//   if (!token) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Unauthorized: No token provided" });
//   }

//   const tokenParts = token.split(" ");
//   if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
//     return res
//       .status(401)
//       .json({ success: false, message: "Unauthorized: Invalid token format" });
//   }

//   const tokenValue = tokenParts[1];

//   jwt.verify(tokenValue, "your_secret_key", (err, decodedToken) => {
//     if (err) {
//       // Token is invalid or expired
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     } else {
//       const userId = decodedToken.userId;
//       // Now you can use the userId to perform operations, such as fetching user data from the database
//       // Example:
//       User.findById(userId)
//         .then((user) => {
//           if (!user) {
//             return res
//               .status(404)
//               .json({ success: false, message: "User not found" });
//           } else {
//             // User found, do something with it
//             res.status(200).json({ success: true, user: user });
//             next()
//           }
//         })
//         .catch((err) => {
//           console.error(err);
//           return res
//             .status(500)
//             .json({ success: false, message: "Internal Server Error" });
//         });
//     }
//   });
// };


// const jwt = require('jsonwebtoken');
// const User = require('../model/User');

exports.fetchUser = async (req, res, next) => {
  const token = req.headers.authorization; // Assuming the token is included in the Authorization header
 // console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: No token provided" });
  }

  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token format" });
  }

  const tokenValue = tokenParts[1];

  jwt.verify(tokenValue, "Chhaya@10", async (err, decodedToken) => {
    if (err) {
      // Token is invalid or expired
      return res.status(401).json({ success: false, message: "Unauthorized" });
    } else {
      const userId = decodedToken.userId;
      // Now you can use the userId to perform operations, such as fetching user data from the database
      // Example:
      const user = await User.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      } else {
        console.log("user" , user)
        // User found, do something with it
        req.user = user; // Attach the user object to the request for further use
        next(); // Call next middleware function
      }
     
        
    }
  });
};
