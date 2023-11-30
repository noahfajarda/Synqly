import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

export default async function ThreadsTab({
  currentUserId,
  accountId,
  accountType,
}: Props) {
  const result =
    accountType === "Community"
      ? await fetchCommunityPosts(accountId.toString())
      : await fetchUserPosts(accountId);

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {/* go through comments, creating a new card for each one */}
      {result.threads.reverse().map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          asset={thread.asset}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          } // todo
          community={thread.community} // todo
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
}
