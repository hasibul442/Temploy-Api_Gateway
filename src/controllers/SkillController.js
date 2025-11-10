import { getAllSkills, createSkill, getSkillById, updateSkill, deleteSkill } from "../services/SkillService.js";

export async function getSkillList(req, res, next) {
    try {
        const skills = await getAllSkills(req);
        res.status(200).json({
            status: 200,
            success: true,
            ...skills
        });
    } catch (error) {
        next(error);
    }
}

export async function createSkillData(req, res, next) {
    try {
        const skill = await createSkill(req);
        res.status(200).json({
            status: 200,
            success: true,
            data: skill
        });
    } catch (error) {
        next(error);
    }
}

export async function getSkill(req, res, next) {
    try {
        const skill = await getSkillById(req.params.id);
        if (!skill) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Skill not found"
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            data: skill
        });
    } catch (error) {
        next(error);
    }
}

export async function updateSkillData(req, res, next) {
    try {
        const skill = await updateSkill(req.params.id, req);
        if (!skill) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Skill not found"
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            data: skill
        });
    }
    catch (error) {
        next(error);
    }
};

export async function deleteSkillData(req, res, next) {
    try {
        const skill = await deleteSkill(req.params.id);
        if (!skill) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "Skill not found"
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            data: skill
        });
    } catch (error) {
        next(error);
    }
}