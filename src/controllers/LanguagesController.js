import Languages from "../models/Languages.js";

export async function getLanguages(req, res, next) {
    try {
        const languages = await Languages.find().sort({ name: 1 });
        res.status(200).json({
            status: 200,
            success: true,
            data: languages
        });
    } catch (error) {
        next(error);
    }
};
