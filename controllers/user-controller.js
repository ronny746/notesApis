const User = require("../models/user");
//const { use } = require("../routes/user-routes");
const Otp = require("../models/otp-model");

function generateOTP() {
          
  // Declare a digits variable 
  // which stores all digits
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 4; i++ ) {
      OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}




exports.sendOtp = async (req, res ,next)=>{

  const { mobile } = req.body;
  let otp = generateOTP();

  let user = await User.findOne({mobile});
  if(user){
    return res.status(404).json({ message: " Users Already Exist!" });
  }
  let exitnumber = await Otp.findOne({mobile:mobile});
  console.log(exitnumber);
  
  if(exitnumber){
    await exitnumber.updateOne({
      mobile,
      otp
    });
    return res.status(200).json({ otp });
  }

  const otpnew = new Otp({
    mobile,
    otp
  });

  try {
    await otpnew.save();
  } catch (error) {
    console.log(error);


  }
  return res.status(201).json({ otp ,otpnew});
}


exports.verifyOtp = async (req,res,next)=>{
  const { mobile,otp } = req.body;

  let mobi = await Otp.findOne({mobile});

  if(!mobi){
    return res.status(404).json({ message: "Mobile number not exist!" });
  }

  if(mobi.otp == otp){
    let user = await User({
      mobile,
    });
    await user.save();
    return res.status(200).json({ message: "Otp Varification successfully!",user});
  }
  return res.status(404).json({ message: "Invalid Otp!" });
}

exports.getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find().populate('notes');
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });
}

exports.signup = async (req, res, next) => {
  console.log('hit user sign up');

  const { name,mobile, password } = req.body;
  if (name == null || mobile == null || password == null) {
    return res.status(400).json({ message: "All Fields are Required!" });
  }


  let existinguser;
  try {
    existinguser = await User.findOne({ mobile });
  } catch (error) {
    console.log(error);
  }
  if (existinguser) {
    return res.status(400).json({ message: "user Alredy Exist!" });
  }
  const user = new User({
    name,
    mobile,
    password,
    notes:[],
  });

  try {
    await user.save();
  } catch (error) {
    console.log(error);


  }
  return res.status(201).json({ user });
}

exports.login = async (req,res,next)=>{
  
    const {mobile, password} = req.body;
    if (mobile == null) {
      return res.status(400).json({ message: " Email Required!" });
    }
    if (password == null) {
      return res.status(400).json({ message: " Password Required!" });
    }

    let user = await User.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ message: "User Not Found!" });
    }
    if(user.password == password){
      return res.status(200).json({ user });
    }
    return res.status(404).json({ message: "Credentials Not Matched!" });
}

exports.Update = async (req,res,next) =>{
  try {
    console.log('hit update user details');
    const { name,address,rollnumber,Specification, password} = req.body;
    const update = {
        name,
        address,
        rollnumber,
        Specification,
        password
    }
     
     await User.findByIdAndUpdate(req.params.id, update);
     const updatedUser = await User.findById(req.params.id);
    if (updatedUser) {
        return res.status(200).json({
          message: "user Update Successfully!",updatedUser
        })
    } else {
        return next(createError(400, 'cannot update the user'))
    }


} catch (error) {
    console.log(error);
    return res.status(500).json({
        errorName: error.name,
        message: error.message
    })
}
}

exports.deleteUser = async (req,res,next)=>{

  let user = await User.findByIdAndDelete(req.params.id);
  if(!user){
    return res.status(404).json({ message: "User Not Found!" });
  }
  return res.status(200).json({ message: "User Deleted!" });

}