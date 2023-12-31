import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  // associated USER model
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  asset: {
    type: String,
  },
  // associated COMMUNITY model
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  // date
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  children: [
    // associated THREAD model (recursively)
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
