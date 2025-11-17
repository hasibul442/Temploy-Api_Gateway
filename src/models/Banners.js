import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    banner: {
        type: String,
        required: [ true, 'Banner image is required' ],
    },
    title : {
        type: String,
        required: [ true, 'Title is required' ],
    },
    description: {
        type: String,
        required: [ true, 'Description is required' ],
    },
    status: {
        type: Boolean,
        default: false,
    },
    validity: {
        type: Date,
        default: null,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employees",
        required: [ true, 'Created by is required' ],
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employees",
        default: null,
    },
});

export default mongoose.model("Banners", bannerSchema);
