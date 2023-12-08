import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page() {
  // check for current user and info
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("onboarding");

  // get activity (comments)
  const activity = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              // render each comment and link to original post
              <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card bg-cyan-600 hover:bg-cyan-900 transition-all">
                  <Image
                    src={activity.author.image}
                    alt="Profile Picture"
                    width={20}
                    height={20}
                    className="rounded-full object-cover"
                  />
                  <p className="!text-small-regular text-light-1">
                    <span className="mr-1 text-emerald-300">
                      {activity.author.name}
                    </span>
                    replied to your post:
                  </p>
                  <p className="!text-small-regular text-emerald-300">
                    {activity.text}
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="!text-base-regular text-light-3">No Activity yet</p>
        )}
      </section>
    </section>
  );
}
