import Level from "../models/Level.js";

export async function getLevels(req, res, next) {
    try {
        const levels = await Level.find().sort({ createdAt: -1 });
        res.status(200).json({
            status: 200,
            success: true,
            data: levels
        });
    } catch (error) {
        next(error);
    }
};

export async function createLevel(req, res, next) {
    try {
        const newLevel = await Level.create(req.body);
        res.status(200).json({
            status: 200,
            success: true,
            data: newLevel
        });
    } catch (error) {
        next(error);
    }
};
