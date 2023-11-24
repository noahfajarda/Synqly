"use server";

import { revalidatePath } from "next/cache";
import Thread from "@/lib/models/thread.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  text: string;
  author: string;
  asset: string;
  communityId: string | null;
  path: string;
}

// equivalent to API endpoint, CREATE post
export async function createThread({
  text,
  author,
  asset,
  communityId,
  path,
}: Params) {
  try {
    connectToDB();

    const data = {
      text,
      author,
      community: null,
    };

    if (asset) data.asset = asset;

    // create new THREAD
    const createdThread = await Thread.create(data);

    // Update user model with ASSOCIATED thread
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    // reroute back to 'create-thread' path/page
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error creating thread: ${error.message}`);
  }
}

// READ ALL
export async function readAllThreads(pageNumber = 1, pageSize = 20) {
  connectToDB();

  // calculate number of posts to skip
  const skipAmount = (pageNumber - 1) * pageSize;

  // Don't include comments, but populate child posts recursively
  // populate author too
  const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  // get total post count for pagination
  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  // execute the query
  const posts = await postsQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
}

// READ ONE
export async function readOneThread(id: string) {
  connectToDB();

  try {
    // retrieve one post, then populate posts recursively
    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      // execute the query
      .exec();

    return thread;
  } catch (error: any) {
    throw new Error(`Error fetching thread: ${error.message}`);
  }
}

// CREATE comment ASSOCIATED to post
export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB();

  try {
    // add comment
    // Find original post by id
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error("Thread not found");
    }

    // Create new post with comment text
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    // save new post
    const savedCommentThread = await commentThread.save();

    // update original post with new comment
    originalThread.children.push(savedCommentThread._id);

    // save original post
    await originalThread.save();

    // show updated data instantly
    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error adding comment to post: ${error.message}`);
  }
}
