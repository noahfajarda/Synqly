import ThreadCard from "@/components/cards/ThreadCard";
import SearchSection from "@/components/redux/SearchSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { readAllThreads } from "@/lib/actions/thread.actions";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function page() {
  // check for current user and info
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("onboarding");

  // fetch users with action
  const usersResult = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  // get threads
  const threadsResult = await readAllThreads(1, 20);

  return (
    <section>
      <h1 className="head-text mb-10">Search Content</h1>
      <SearchTabs
        usersResult={usersResult}
        threadsResult={threadsResult}
        user={user}
      />
    </section>
  );
}

async function SearchTabs({ usersResult, threadsResult, user }) {
  return (
    <Tabs defaultValue="Users" className="w-full">
      <TabsList className="tab">
        {/* tab triggers value match tab content value */}
        <TabsTrigger value="Users" className="tab">
          <div>Search Users</div>
        </TabsTrigger>
        <TabsTrigger value="Synqlets" className="tab">
          <div>Search Synqlets</div>
        </TabsTrigger>
      </TabsList>

      {/* tab triggers value match tab content value */}
      <TabsContent value="Users" className="w-full text-light-1">
        {/* Search Bar */}
        <SearchSection users={await JSON.parse(JSON.stringify(usersResult))} />
        {usersResult.users.length === 0 && (
          <p className="no-result">No Users</p>
        )}
      </TabsContent>
      <TabsContent value="Synqlets" className="w-full text-light-1">
        <div>
          {/* go through users */}
          {threadsResult.posts &&
            threadsResult.posts.map((post: any, idx) => (
              <div key={idx} className="p-4">
                <ThreadCard
                  key={post._id}
                  id={post._id}
                  currentUserId={user?.id || ""}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  asset={post.asset}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                />
              </div>
            ))}
        </div>
        {threadsResult.posts.length === 0 && (
          <p className="no-result">No Posts</p>
        )}
      </TabsContent>
    </Tabs>
  );
}
