"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

// equivalent to API endpoint, CREATE post
export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  try {
    connectToDB();

    // create new THREAD
    const createdThread = await Thread.create({
      text,
      author,
      community: null,
    });

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
