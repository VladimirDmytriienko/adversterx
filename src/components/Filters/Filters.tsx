'use client';

import { useRef, useState, useMemo, useEffect } from 'react';

export default function Filters({ users, setFilteredUsers }: { users: any[], setFilteredUsers: (users: any[]) => void }) {
  const nameRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');
  const [filterTrigger, setFilterTrigger] = useState(0);

  const handleApply = () => {
    setFilterTrigger(prev => prev + 1);
  };

  const handleReset = () => {
    nameRef.current!.value = '';
    cityRef.current!.value = '';
    emailRef.current!.value = '';
    usernameRef.current!.value = '';
    setSortOrder('none');
    setFilterTrigger(prev => prev + 1);
  };

  const filteredUsers = useMemo(() => {
    const name = nameRef.current?.value.toLowerCase() || '';
    const city = cityRef.current?.value.toLowerCase() || '';
    const email = emailRef.current?.value.toLowerCase() || '';
    const username = usernameRef.current?.value.toLowerCase() || '';

    let result = users.filter(user =>
      user.name.toLowerCase().includes(name) &&
      user.address.city.toLowerCase().includes(city) &&
      user.email.toLowerCase().includes(email) &&
      user.username.toLowerCase().includes(username)
    );

    if (sortOrder === 'asc') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'desc') {
      result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [users, sortOrder, filterTrigger]);

  useEffect(() => {
    setFilteredUsers(filteredUsers);
  }, [filteredUsers, setFilteredUsers]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-[1200px]">
        <input
          ref={nameRef}
          type="text"
          placeholder="Search by name"
          className="p-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition"
        />
        <input
          ref={cityRef}
          type="text"
          placeholder="Search by city"
          className="p-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition"
        />
        <input
          ref={emailRef}
          type="text"
          placeholder="Search by email"
          className="p-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition"
        />
        <input
          ref={usernameRef}
          type="text"
          placeholder="Search by username"
          className="p-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition"
        />
      </div>

      <div className="w-full max-w-[1200px] flex flex-col sm:flex-row justify-between items-center gap-4 mt-0 sm:mt-4">
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value as 'none' | 'asc' | 'desc')}
          className="p-2 border rounded-lg shadow border-gray-700 bg-gray-800 text-white w-full sm:w-auto focus:outline-none focus:border-orange-500 transition"
        >
          <option value="none">Default</option>
          <option value="asc"> A → Z</option>
          <option value="desc">Z → A</option>
        </select>

        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleApply}
            className="w-full sm:w-auto px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            Apply Filters
          </button>
          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-4 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 transition"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </>
  )
}
