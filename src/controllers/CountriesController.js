import Countries from "../models/Countries.js";

export async function getCountries(req, res, next) {
    try {
        const countries = await Countries.find().sort({ country: 1 });
        res.status(200).json({
            status: 200,
            success: true,
            data: countries
        });
    } catch (error) {
        next(error);
    }
};

export async function addCountry(req, res, next) {
    try {
        const newCountry = await Countries.create(req.body);
        res.status(200).json({
            status: 200,
            success: true,
            data: newCountry
        });
    } catch (error) {
        next(error);
    }
};

export async function getCountryById(req, res, next) {
    try {
        const country = await Countries.findById(req.params.id);
        if (!country) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Country not found"
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            data: country
        });
    } catch (error) {
        next(error);
    }
};

export async function updateCountry(req, res, next) {
    try {
        const country = await Countries.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!country) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Country not found"
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            data: country
        });
    } catch (error) {
        next(error);
    }
};

export async function deleteCountry(req, res, next) {
    try {
        const country = await Countries.findByIdAndDelete(req.params.id);
        if (!country) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Country not found"
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Country deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
