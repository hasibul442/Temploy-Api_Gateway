import { create, getById, getList, remove, update } from "../services/BannerService.js";
import { authTokenDecoder } from "../utils/helper/helper.js";

export async function getBanner(req, res, next) {
    try {
        const banners = await getList(req);
        res.status(200).json({
            status: 200,
            success: true,
            ...banners
        });
    } catch (error) {
        next(error);
    }
}

export async function createBanner(req, res, next) {
    try {
        const authToken = req.headers.authorization;
        const userId = await authTokenDecoder(authToken);
        const banner = await create(req, userId);
        res.status(200).json({
            status: 200,
            success: true,
            data: banner
        });
    } catch (error) {
        next(error);
    }
}

export async function getBannerById(req, res, next) {
    try {
        const banner = await getById(req.params.id);
        if (!banner) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Banner not found"
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            data: banner
        });
    } catch (error) {
        next(error);
    }
}

export async function updateBanner(req, res, next) {
    try {
         const authToken = req.headers.authorization;
        const userId = await authTokenDecoder(authToken);
        const updatedBanner = await update(req.params.id, req, userId);
        if (!updatedBanner) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Banner not found"
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            data: updatedBanner
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteBanner(req, res, next) {
    try {
        const banner = await remove(req.params.id);
        if (!banner) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Banner not found"
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Banner deleted successfully"
        });
    } catch (error) {
        next(error);
    }
}
