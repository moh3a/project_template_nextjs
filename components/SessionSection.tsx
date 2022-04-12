import { useSession, signIn, signOut } from "next-auth/react";

const SessionSection = () => {
  const { data: session } = useSession();
  return (
    <div>
      <h2>Session management is configured</h2>
      <p>and it can be customized to work with multiple providers</p>
      {session ? (
        <>
          Signed in as {session.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </div>
  );
};

export default SessionSection;
