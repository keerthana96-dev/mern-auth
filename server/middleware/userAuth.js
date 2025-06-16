// // 
// import jwt from "jsonwebtoken";

// const userAuth = async (req, res, next) => {
//   const { token } = req.cookies;

//   if (!token) {
//     return res.json({ success: false, message: "Not Authorized. Please log in." });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (!decoded?.id) {
//       return res.json({ success: false, message: "Invalid token. Please log in again." });
//     }

//     req.user = { id: decoded.id }; // Attach user ID here

//     next(); // Continue to route
//   } catch (error) {
//     return res.json({ success: false, message: "Token expired or invalid" });
//   }
// };

// export default userAuth;


import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Please log in." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ success: false, message: "Invalid token. Please log in again." });
    }

    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Token expired or invalid" });
  }
};

export default userAuth;
