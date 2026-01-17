"use client";

import { updateUserBio } from "@/lib/actions/userActions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";

const UserProfileBio = ({ user }: { user: any }) => {
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
      setError(res.message);
    }
  };
  const resetEditOpen = () => {
    setOpenFirstName(false);
    setOpenLastName(false);
    setOpenUserName(false);
    setOpenEmail(false);
  };
  return (
    <div className="space-y-2 text-sm text-gray-700 mb-8">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex gap-2 items-center text-[16px]">
        <p>First name: </p>
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
        <MdOutlineEdit
          className="cursor-pointer"
          onClick={() => setOpenFirstName(!openFirstName)}
        />
      </div>
      <div className="flex gap-2 items-center text-[16px]">
        <p>Last name: </p>
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
        <MdOutlineEdit
          className="cursor-pointer"
          onClick={() => setOpenLastName(!openLastName)}
        />
      </div>
      <div className="flex gap-2 items-center text-[16px]">
        <p>Username: </p>
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
        <MdOutlineEdit
          className="cursor-pointer"
          onClick={() => setOpenUserName(!openUserName)}
        />
      </div>
      <div className="flex gap-2 items-center text-[16px]">
        <p>Email: </p>
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
        <MdOutlineEdit
          className="cursor-pointer"
          onClick={() => setOpenEmail(!openEmail)}
        />
      </div>

      <div className="flex gap-2 items-center text-[16px]">
        <p>Created: {new Date(user.createdAt).toLocaleDateString("hr-HR")}</p>
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
