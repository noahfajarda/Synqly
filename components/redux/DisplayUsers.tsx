import UserCard from "../cards/UserCard";

// necessary to be rendered on the SERVER
export const UserList = ({ users }) => {
  return (
    <div>
      {/* go through users */}
      {users &&
        users.map((person, idx) => (
          <div key={idx} className="p-4">
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
  );
};
