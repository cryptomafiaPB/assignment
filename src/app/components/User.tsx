import React from "react";

function User({ user }: any) {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center">
        <h1 className="pb-4 font-bold hover:font-semibold duration-100 cursor-pointer">
          {user?.name}
        </h1>
        <img
          className="cursor-pointer relative rounded-full w-14 h-14 hover:w-[54px] hover:h-[54px] duration-100"
          src={
            "https://i.etsystatic.com/10131659/r/il/0f522b/3870142171/il_fullxfull.3870142171_5sym.jpg"
          }
          // user.picture.data.url ||
          alt="user image"
        />
      </div>
    </div>
  );
}

export default User;
