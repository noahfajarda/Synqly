"use client";

import {
  useSelector,
  useDispatch,
  Provider as ReduxProvider,
} from "react-redux";

import { selectSearch, setSearch, store } from "@/lib/redux/DataStore";
import { UserList } from "./DisplayUsers";
import { useMemo } from "react";

export default function SearchSection({ users }) {
  return (
    <ReduxProvider store={store}>
      <div className="grid gap-5">
        <SearchBar />
        <UserListContainer users={users} />
      </div>
    </ReduxProvider>
  );
}

function UserListContainer({ users }) {
  const search = useSelector(selectSearch);

  const filterAndSortUsers = useMemo(() => {
    return (users.users || [])
      .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 10)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [users, search]);

  return <UserList users={filterAndSortUsers} />;
}

function SearchBar() {
  const search = useSelector(selectSearch);
  const dispatch = useDispatch();

  return (
    <input
      className="p-2 rounded-md bg-slate-600 text-white"
      type="text"
      placeholder="Search Users"
      value={search}
      onChange={(e) => {
        dispatch(setSearch(e.target.value));
      }}
    />
  );
}
