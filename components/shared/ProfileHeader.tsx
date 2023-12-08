import Image from "next/image";
import Link from "next/link";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
}

export default function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
}: Props) {
  return (
    // pfp, name, username
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              alt="Profile Imiage"
              fill
              className="rounded-full object-cover shadow-2xl outline outline-offset-2 outline-2 outline-emerald-300"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left text-heading3-bold text-light-1">
              {name}
            </h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
        </div>
      </div>

      {/* TODO: Community */}

      <p className="mt-5 max-w-lg text-base-regular text-light-2">{bio}</p>
      <div className="mt-12 h-0.5 w-full bg-dark-3" />
      <Link
        href="/profile/edit"
        className={`leftsidebar_link flex justify-center text-white bg-cyan-600 hover:bg-cyan-900 transition-all`}
      >
        Edit Profile
      </Link>
    </div>
  );
}
