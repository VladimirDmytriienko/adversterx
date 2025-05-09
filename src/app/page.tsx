import UserCards from '@/components/UserCards/UserCards';

const getUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return res.json();
}


export default async function Home() {
  const users = await getUsers()
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)] bg-gray-900">
      <UserCards users={users} />
    </div>
  );
}
