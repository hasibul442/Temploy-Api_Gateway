import HttpCode from "../utils/constants/HttpCode.js";
import ResponseCode from "../utils/constants/ResponseCode.js";
import connectDB from "../utils/dbconnection.js";

export async function healthCheck(req, res) {
    await res.status(HttpCode.OK).json(
        {
            code: HttpCode.OK,
            status: ResponseCode.SUCCESS,
            success: true,
            message: "API Server is running",
            database: await connectDB(),
        }
    );
}