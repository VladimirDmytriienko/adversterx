'use client';

import { useRef, useState, useMemo } from 'react';
import Filters from '../Filters/Filters';

export default function UserCards({ users }: { users: any[] }) {
  const [filteredUsers, setFilteredUsers] = useState(users);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <Filters users={users} setFilteredUsers={setFilteredUsers} />

      <main className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {filteredUsers.map(user => (
          <div
            key={user.id}
            className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center min-h-[180px] transition hover:shadow-xl hover:bg-gray-700 border border-gray-700"
          >
            <span className="text-lg font-semibold text-white">{user.name}</span>
            <p className="text-orange-500 text-sm mt-1">@{user.username}</p>
            <p className="text-gray-300 mt-1">{user.email}</p>
            <p className="text-gray-400 text-sm mt-1">{user.address.city}</p>
          </div>
        ))}
      </main>
    </div>
  )
}
