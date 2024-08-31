"use client";
import Login from "@/app/components/Login";
import { useState } from "react";
import User from "./components/User";
import Pages from "./components/Pages";
import { Users } from "@/types/types";

export default function Home() {
  const [user, setUser] = useState<Users>();
  return (
    <div className="mx-auto max-w-5xl text-2xl gap-2 flex items-center justify-center w-full min-h-screen">
      <main className="flex  flex-col items-center justify-between p-14">
        {!user ? (
          <Login setUser={setUser} />
        ) : (
          <>
            {user && <User user={user} />}
            <Pages accessToken={user.accessToken} userId={user.id} />
          </>
        )}
      </main>
    </div>
  );
}
