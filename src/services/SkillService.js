import Skill from "../models/Skill.js";

export async function getAllSkills(req) {
    const searchParams = req.query;
    if (Object.keys(searchParams).length === 0) {
        const skills = await Skill.find({status: true}).sort({ createdAt: -1 });
        return { data: skills };
    } else {
        const page = parseInt(searchParams.page || '1', 10);
        const limit = parseInt(searchParams.limit || '10', 10);
        const skip = (page - 1) * limit;

        const [skills, total] = await Promise.all([
            Skill.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
            Skill.countDocuments()
        ]);

        return {
            data: skills,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
}

export async function createSkill(req) {
    const newSkill = new Skill(req.body);
    await newSkill.save();
    return { data: newSkill };
}

export async function getSkillById(id) {
    return await Skill.findById(id);
}

export async function updateSkill(id, req) {
    const skill = await Skill.findById(id);
    if (!skill) return null;
    return await Skill.findByIdAndUpdate(id, req.body, { new: true });
}

export async function deleteSkill(id) {
    const skill = await Skill.findByIdAndDelete(id);
    return skill;
}