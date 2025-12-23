import Currencies from "../models/Currencies.js";

export async function getCurrencies(req, res, next) {
    try {
        const currencies = await Currencies.find().sort({ createdAt: -1 });
        res.status(200).json({
            status: 200,
            success: true,
            data: currencies
        });
    } catch (error) {
        next(error);
    }
};
