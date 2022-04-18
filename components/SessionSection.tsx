import { useSession, signIn, signOut } from "next-auth/react";

const SessionSection = () => {
  const { data: session } = useSession();
  return (
    <div>
      <h2 className="text-xl font-bold">Session management is configured</h2>
      <p>and it can be customized to work with multiple providers</p>
      {session ? (
        <>
          Signed in as {session.user?.email} <br />
          <button
            onClick={() => signOut()}
            className="px-3 py-1 rounded-lg text-white font-bold bg-pink-500 shadow-lg shadow-pink-500/50 hover:bg-violet-500 hover:shadow-violet-500/50"
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          Not signed in <br />
          <button
            onClick={() => signIn()}
            className="px-3 py-1 rounded-lg text-white font-bold bg-pink-500 shadow-lg shadow-pink-500/50 hover:bg-violet-500 hover:shadow-violet-500/50"
          >
            Sign in
          </button>
        </>
      )}
    </div>
  );
};

export default SessionSection;
