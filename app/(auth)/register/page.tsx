"use client";

import { registerUser } from "@/lib/actions/userActions";
import Link from "next/link";
import { useState } from "react";

const RegisterPage = () => {
  const [error, setError] = useState<string | null>(null);

  return (
    <section className="w-full h-screen flex items-center justify-center px-2">
      <form
        className="flex flex-col gap-4 w-full max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl custom-box-shadow-sm"
        action={async (formData: FormData) => {
          try {
            setError(null);
            await registerUser(formData);
          } catch (err) {
            if (err instanceof Error) {
              setError(err.message);
            } else {
              setError(String(err));
            }
          }
        }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Sign up
        </h1>
        <input
          type="text"
          name="first-name"
          placeholder="First name"
          className="border border-gray-300 rounded-md p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          name="last-name"
          placeholder="Last name"
          className="border border-gray-300 rounded-md p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border border-gray-300 rounded-md p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-gray-300 rounded-md p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border border-gray-300 rounded-md p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-blue-800 text-white p-2 md:p-3 rounded-md hover:bg-blue-900 transition"
        >
          SIGN UP
        </button>
        <div className="flex gap-2 text-sm text-gray-600 justify-center mt-4">
          <p>You have an account?</p>
          <Link href="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
