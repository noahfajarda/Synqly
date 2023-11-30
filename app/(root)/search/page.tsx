import SearchSection from "@/components/redux/SearchSection";
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
  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search For Users</h1>

      {/* Search Bar */}
      <div className="mt-14 flex flex-col gap-9">
        <SearchSection users={await JSON.parse(JSON.stringify(result))} />
        {result.users.length === 0 && <p className="no-result">No Users</p>}
      </div>
    </section>
  );
}
