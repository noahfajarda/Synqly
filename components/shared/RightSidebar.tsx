import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { createIndiciesArr } from "@/lib/utils";
import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "../cards/CommunityCard";

export default async function RightSidebar() {
  // check for current user and info
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("onboarding");

  // fetch communities with action
  const communityResult = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  // fetch users with action
  const userResult = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  let suggestedUsers = userResult.users; // array of users
  const shownUsers = 3;
  // get at most 3 random users
  const indiciesArr =
    suggestedUsers.length > shownUsers
      ? createIndiciesArr(shownUsers, suggestedUsers)
      : [];

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>
        <div>
          {communityResult.communities.map((community) => (
            <div className="p-3">
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
        <div className="p-4">
          {/* show random users */}
          {indiciesArr.length === shownUsers ? (
            <>
              {indiciesArr.map((num) => (
                <div key={num} className="py-3">
                  <UserCard
                    key={suggestedUsers[num].id}
                    id={suggestedUsers[num].id}
                    name={suggestedUsers[num].name}
                    username={suggestedUsers[num].username}
                    imgUrl={suggestedUsers[num].image}
                    personType="User"
                  />
                </div>
              ))}
            </>
          ) : (
            <>
              {suggestedUsers.map((person, idx) => (
                <div key={idx} className="py-3">
                  <UserCard
                    key={person.id}
                    id={person.id}
                    name={person.name}
                    username={person.username}
                    imgUrl={person.image}
                    personType="User"
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
