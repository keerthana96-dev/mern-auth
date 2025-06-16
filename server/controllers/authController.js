import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js'
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/emailTemplates.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User Already Exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    console.log("Sending mail to:", email);
    console.log("Using sender:", process.env.SENDER_EMAIL);

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to MERN Stack Project by Keerthana Ravi Shankar",
      text: `Welcome to the MERN stack website. Your account has been created with email ID: ${email}`,
    };

    try {
      const mailResult = await transporter.sendMail(mailOptions);
      console.log("✅ Email sent:", mailResult.response);
    } catch (mailError) {
      console.error("❌ Failed to send email:", mailError);
      return res.status(500).json({ success: false, message: "User created but email failed to send" });
    }

    return res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Registration error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const login = async(req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
      return res.json({success:false, message:'Email and Password are required'})  
    }

    try{

     const  user = await userModel.findOne({email});
     if(!user) {
        return res.json({success:false, message:'Invalid email' })
     }
     
     const isMatch = await bcrypt.compare(password, user.password);

     if(!isMatch){
        return res.json({success:false, message:'Invalid password' })
     }

     const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{expiresIn: '7d'});
    res.cookie('token', token ,{
        httpOnly : true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        maxAge: 7 * 24* 60 * 60 * 1000
    });
    
    return res.json({success:true});
        
 } catch(error){
        res.json({success:false, message: error.message})

    }
}

export const logout = async(req,res)=>{
    try{
    
        res.clearCookie('token',{httpOnly : true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            } )

            return res.json({success:true, message: "Logged Out"})

    } catch(error){
        res.json({success:false, message: error.message})
    }
}
// sending verification to user email
export const sendVerifyOtp = async(req,res)=>{
    try{
     const userId = req.user.id;

     
     const user = await userModel.findById(userId);
     if(user.isAccountVerified) {
        return res.json({success: false, message: "Account Already Verified"})
     }
  
    const otp = String(Math.floor(100000 + Math.random() * 900000));


   user.verifyOtp = otp;
   user.verifyOtpExpireAt = Date.now() + 24*60*60*1000
   
   await user.save();

   const mailOption = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: 'Account Verification OTP',
    // text: `Your OTP is ${otp}. Verify your account using this OTP`,
    html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}", otp).replace("{{email}}", user.email)
   }
 await transporter.sendMail(mailOption);

 return res.json({success:true, message : "Verification OTP sent on Email"});
    }
 catch(error){
     return res.json({success:false, message: error.message});

 }
}



export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  const userId = req.user?.id;

  if (!otp || !userId) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    return res.json({ success: true, message: "Email Verified Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};



export const isAuthenticated = async (req, res)=>{
    try{

      return res.json({success: true});

    } catch(error){
        res.json({success:false, message:error.message});

    }
}



export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, message: 'Email is required' });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    console.log("Generated OTP:", otp);

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;

    console.log("Before Save:", user.resetOtp, user.resetOtpExpireAt);

    await user.save();

    console.log("After Save:", user);

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: 'Password Reset OTP',
      // text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password.`,
      html:PASSWORD_RESET_TEMPLATE .replace("{{otp}}", otp) .replace("{{email}}", user.email)
    };

    await transporter.sendMail(mailOption);

    return res.json({ success: true, message: 'OTP sent to your email' });

  } catch (error) {
    console.error("Error during sendResetOtp:", error);
    return res.json({ success: false, message: error.message });
  }
};









// verify otp and reset password controller function 

export const resetPassword = async(req,res)=>{
    const {email,otp,newPassword} = req.body;
    if(!email || !otp || !newPassword){
        return res.json({success:false, message:'Email , OTP and new password required'});
    }


    try{

        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false, message:'User not found'})
        }
        if(!user.resetOtp || user.resetOtp !== otp){
            return res.json({success:false, message: 'Invalid OTP'});
        }
        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success:false, message: 'OTP Expired'})

        }

     const hashedPassword = await bcrypt.hash(newPassword, 10);
     user.password = hashedPassword;
     user.resetOtp = '';
     user.resetOtpExpireAt = 0;

     await user.save()

   return res.json({ success: true, message: 'Password reset successfully' });

    }
    catch(error){
        return res.json({success:false, message:error.message})
    }
}





































