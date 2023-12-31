"use server";

import { revalidatePath } from "next/cache";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import Thread from "@/lib/models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";
import Community from "../models/community.model";
import { clerkClient } from "@clerk/nextjs/server";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
  pfpUrl?: string;
}

// actions similar to API routes, (DB data manipulation)
export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
  pfpUrl,
}: Params): Promise<void> {
  connectToDB();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true } // upsert: insert OR update (if already exists)
    );

    // update user on clerk
    const clerkUserUpdate = {
      firstName: name.substring(0, name.indexOf(" ")),
      lastName: name.substring(name.indexOf(" ") + 1),
      username: username.toLowerCase(),
      imageUrl: pfpUrl,
    };

    await clerkClient.users.updateUser(userId, clerkUserUpdate);

    if (path === "/profile/edit") {
      // revalidate data mannually using path without relying on cache
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB();

    return await User.findOne({ id: userId }).populate({
      path: "communities",
      model: Community,
    });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();

    // find all posts authored by user with the given userId
    const threads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: [
        {
          path: "community",
          model: Community,
          select: "name id image _id", // get name, id, image from "Community" model
        },
        {
          path: "children",
          model: Thread,
          populate: {
            path: "author",
            model: User,
            select: "name image id", // get name and id from "User" model
          },
        },
      ],
    });

    return threads;
  } catch (error: any) {
    throw new Error(`Failed to fetch user posts: ${error.message}`);
  }
}

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const regex = new RegExp(searchString, "i");

    // everything NOT EQUAL to user id
    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    // serach for people by name or username query
    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy };

    // find users (sort by first created, skip number, limit by page size)
    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    // get user count
    const totalUsersCount = await User.countDocuments(query);

    const users = await usersQuery.exec();

    // check if there are more users than what's displayed on the page
    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error: any) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
}

export async function getActivity(userId: string) {
  try {
    connectToDB();

    // find all threads created by the user
    const userThreads = await Thread.find({ author: userId });

    // Collect all the child thread ids (replies) from the 'children' field
    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children);
    }, []);

    // find the post with the associated author and children and return
    const replies = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId },
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });

    return replies;
  } catch (error: any) {
    throw new Error(`Failed to fetch activity: ${error.message}`);
  }
}
