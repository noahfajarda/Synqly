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
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            {/* post user's pfp */}
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile image"
                fill
                className="cursor-pointer rounded-full outline outline-offset-2 outline-2 outline-emerald-300"
              />
            </Link>
            <div className="thread-card_bar" />
          </div>
          <div className="flex w-full flex-col">
            <div className="flex justify-between sm:items-center sm:flex-row items-start flex-col">
              <Link href={`/profile/${author.id}`} className="w-fit">
                <h4 className="cursor-pointer text-base-semibold text-light-1">
                  {author.name}
                </h4>
              </Link>
              <p className="text-light-1" style={{ fontSize: 11 }}>
                {createdAt}
              </p>
            </div>
            <p className="mt-2 text-small-regular text-light-2">
              {assetType === "mp4" ? (
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
                  className="cursor-pointer object-contain rounded-md border-2 border-white-500"
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
              </div>

              {/* show comments if exist */}
              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
