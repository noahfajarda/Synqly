import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function RightSidebar() {
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

  // get at most 3 random users
  if (result.users.length > 3) {
    const indices = new Set();

    while (indices.size < 3) {
      const randomIndex = Math.floor(Math.random() * result.users.length);
      indices.add(randomIndex);
    }
    console.log(Array.from(indices));
  }

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
        <div className="p-4">
          {result.users.map((person, idx) => (
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
        </div>
      </div>
    </section>
  );
}
