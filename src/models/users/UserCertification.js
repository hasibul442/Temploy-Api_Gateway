
const userCertificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  certification_name: {
    type: String,
    trim: true,
  },
  issuing_organization: {
    type: String,
    trim: true,
  },
  issue_date: {
    type: Date,
  },
  expiration_date: {
    type: Date,
  },
  credential_id: {
    type: String,
    trim: true,
  },
  credential_url: {
    type: String,
    trim: true,
  },
});

export const UserCertification = mongoose.model("UserCertification", userCertificationSchema);
