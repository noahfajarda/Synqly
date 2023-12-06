import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  asset: string | null;
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

export default function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  asset,
  community,
  createdAt,
  comments,
  isComment,
}: Props) {
  const assetType = asset?.split(".")[asset?.split(".").length - 1];
  createdAt = formatDateString(createdAt);

  return (
    <article
      // conditional spacing for if card is a comment of the parent post
      className={`flex w-full flex-col rounded-xl ${
        isComment ? `px-0 xs:px-7` : `bg-dark-2 p-7`
      }`}
    >
      <div className="flex items-start justify-between sm:flex-row flex-col">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            {/* post user's pfp */}
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile image"
                fill
                className="cursor-pointer rounded-full outline outline-offset-2 outline-2 outline-emerald-300 hover:outline-red-300 transition-all"
              />
            </Link>
            <div className="thread-card_bar" />
            {!isComment && comments.length > 0 && (
              <Link className="pt-2" href={`/thread/${id}`}>
                {/* comments with 1 unique user */}
                {comments.length == 1 ? (
                  <Image
                    src={comments[0].author.image}
                    alt={comments[0].author.name}
                    width={25}
                    height={25}
                    className="rounded-full object-cover outline outline-offset-2 outline-2 outline-emerald-300"
                  />
                ) : (
                  <div className="flex">
                    {/* comments with 2 or more unique users */}
                    {comments.slice(0, 2).map((comment, idx) => {
                      const translateVal = idx % 2 == 0 ? "3" : "-3";
                      return (
                        <Image
                          key={idx}
                          src={comment.author.image}
                          alt={comment.author.name}
                          width={25}
                          height={25}
                          className={`rounded-full object-cover translate-x-[${translateVal}px] outline outline-offset-1 outline-1 outline-emerald-400`}
                        />
                      );
                    })}
                  </div>
                )}
              </Link>
            )}
          </div>
          <div className="flex w-full flex-col">
            <div>
              <Link href={`/profile/${author.id}`} className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-1 hover:text-cyan-300 transition-all">
                  {author.name}
                </h4>
              </Link>
              {community && (
                <Link
                  href={`/communities/${community.id}`}
                  className="flex items-center"
                >
                  <p className="text-subtle-medium text-gray-1">
                    {community.name} Community
                  </p>

                  <Image
                    src={community.image}
                    alt={community.name}
                    width={14}
                    height={14}
                    className="ml-1 rounded-full object-cover"
                  />
                </Link>
              )}
            </div>
            <p className="mt-2 text-small-regular text-light-2">
              {assetType === "mp4" || assetType === "mov" ? (
                // account for videos
                <video
                  className="w-44 rounded border-2 border-white-500"
                  width="500px"
                  height="500px"
                  controls="controls"
                >
                  {/* video */}
                  <source src={asset} type="video/mp4" />
                </video>
              ) : assetType !== undefined ? (
                // account for images
                <Image
                  src={asset}
                  alt="heart"
                  width={300}
                  height={100}
                  className="object-contain rounded-md border-2 border-white-500"
                />
              ) : (
                <></>
              )}
              {content}
            </p>
            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3 5">
                {/* like, comment, reply, share icons */}
                <Image
                  src="/assets/heart-gray.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/assets/share.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                {currentUserId === author.id && (
                  <Image
                    src="/assets/delete.svg"
                    alt="trash"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                )}
              </div>

              {/* show comments if exist */}
              {!isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  {comments.length == 1 ? (
                    <p className="mt-1 text-subtle-medium text-gray-1">
                      {comments.length} reply
                    </p>
                  ) : (
                    <p className="mt-1 text-subtle-medium text-gray-1">
                      {comments.length} replies
                    </p>
                  )}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* delete post */}
        {/* show comment logos */}

        <p className="text-subtle-medium text-gray-1 sm:pt-0 pt-6">
          {createdAt}
        </p>
      </div>
    </article>
  );
}
