"use client";

import { updateUserBio } from "@/lib/actions/userActions";
import { User } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

const UserProfileBio = ({ user }: { user: User }) => {
  const router = useRouter();

  const [openFirstName, setOpenFirstName] = useState(false);
  const [openLastName, setOpenLastName] = useState(false);
  const [openUserName, setOpenUserName] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [userName, setUserName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const formData = {
      _id: user._id.toString(),
      firstName,
      lastName,
      userName,
      email,
    };
    const res = await updateUserBio(formData);
    if (res.success && res.userName) {
      resetEditOpen();
      router.push(`/user/${res.userName}`);
      router.refresh();
    } else {
      setError(res.message || "");
    }
  };
  const resetEditOpen = () => {
    setOpenFirstName(false);
    setOpenLastName(false);
    setOpenUserName(false);
    setOpenEmail(false);
  };
  return (
    <div className="flex flex-col gap-2 text-sm text-gray-700 mb-8">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col md:flex-row xs:gap-2 text-sm sm:text-sm md:text-base">
        <p>First name: </p>
        <div className="flex gap-1 items-center">
          {openFirstName ? (
            <input
              type="text"
              className="rounded border border-gray-200 px-2 py-1"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          ) : (
            <p>{firstName}</p>
          )}
          {!openFirstName && (
            <MdOutlineEdit
              className="cursor-pointer"
              onClick={() => setOpenFirstName(!openFirstName)}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col items-center md:flex-row xs:gap-2 text-sm sm:text-sm md:text-base">
        <p>Last name: </p>
        <div className="flex gap-1 items-center">
          {openLastName ? (
            <input
              type="text"
              className="rounded border border-gray-200 px-2 py-1"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          ) : (
            <p>{lastName}</p>
          )}
          {!openLastName && (
            <MdOutlineEdit
              className="cursor-pointer"
              onClick={() => setOpenLastName(!openLastName)}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row xs:gap-2 text-sm sm:text-sm md:text-base">
        <p>Username: </p>
        <div className="flex gap-1 items-center">
          {openUserName ? (
            <input
              type="text"
              className="rounded border border-gray-200 px-2 py-1"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          ) : (
            <p>{userName}</p>
          )}
          {!openUserName && (
            <MdOutlineEdit
              className="cursor-pointer"
              onClick={() => setOpenUserName(!openUserName)}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row xs:gap-2 text-sm sm:text-sm md:text-base">
        <p>Email: </p>
        <div className="flex gap-1 items-center">
          {openEmail ? (
            <input
              type="text"
              className="rounded border border-gray-200 px-2 py-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <p>{email}</p>
          )}
          {!openEmail && (
            <MdOutlineEdit
              className="cursor-pointer"
              onClick={() => setOpenEmail(!openEmail)}
            />
          )}
        </div>
      </div>
      {(openFirstName || openLastName || openUserName || openEmail) && (
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => handleSubmit()}
        >
          Save changes
        </button>
      )}
    </div>
  );
};

export default UserProfileBio;
