

import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token; 

        if (!token) {
            return res.status(401).json({
                message: "User not Authenticated",
                success: false,
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        
        if (!decode || !decode.userId) { 
            return res.status(401).json({
                message: "Invalid Token",
                success: false,
            });
        }

        req.user = { id: decode.userId }; 
        console.log("User ID in Middleware:", req.user.id);
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Authentication error",
            error: error.message,
        });
    }
};

export default isAuthenticated;





// import jwt from "jsonwebtoken";

// const isAuthenticated = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;
//         if (!authHeader || !authHeader.startsWith("Bearer ")) {
//             return res.status(401).json({
//                 success: false,
//                 message: "User not Authenticated",
//             });
//         }
        

//         const token = authHeader.split(" ")[1]; // ✅ Extract token from "Bearer <token>"
//         const decode = jwt.verify(token, process.env.SECRET_KEY);
        
//         if (!decode) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Invalid Token",
//             });
//         }

//         req.userId = decode.userId; // ✅ Attach userId to request
//         next();
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Authentication error",
//             error: error.message,
//         });
//     }
// };

// export default isAuthenticated;