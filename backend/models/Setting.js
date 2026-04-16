import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    filterTags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Setting', settingSchema);
