import { useSession } from "next-auth/react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function useUser() {
  const { data: session, status } = useSession();
  const user = session?.user as User | null;
  const loading = status === "loading";

  return { user, loading };
}