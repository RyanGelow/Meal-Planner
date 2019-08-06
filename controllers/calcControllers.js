const db = require("./../models");
//query db for the logged in user = userobj
//pull out params for calc
//  user

module.exports = {
  //bmr calc for gender selection//calories = BMR + activity level
  //Macro calc = Fat=.29 x (cal/9), Protein .18 x (cal/4), Carb .53 x (cal/4)
  getBMR: async (req, res) => {
    try {
      const user = await db.User.findById(req.user._id).populate("user");
      console.log(user);
      const {
        email,
        first_name,
        last_name,
        age,
        gender,
        weight,
        height,
        activity_level
      } = user;
      res.json({
        email,
        first_name,
        last_name,
        age,
        gender,
        weight,
        height,
        activity_level
      });
    } catch (e) {
      res.json(e);
    }
  }
};
