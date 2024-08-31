import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "@/types/types";

function User({ user }: { user: Users }) {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <h1 className="pb-4 font-bold hover:font-semibold duration-100 cursor-pointer">
          {user?.name}
        </h1>
        <Avatar>
          <AvatarImage
            src={`${user.picture.data.url}` || "/profileIcons.webp"}
            alt="Avatar Profile"
          />
          <AvatarFallback>O</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default User;
