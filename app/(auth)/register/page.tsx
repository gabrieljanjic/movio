"use client";

import { registerUser } from "@/lib/actions/userActions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  return (
    <section className="w-full h-screen flex items-center justify-center bg-gray-100">
      <form
        className="flex flex-col gap-4 w-full max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg"
        action={async (formData: FormData) => {
          try {
            setError(null);
            await registerUser(formData);
            router.push("/feed");
          } catch (err: any) {
            setError(err.message);
          }
        }}
      >
        <h1 className="text-3xl font-bold text-center mb-4">Sign up</h1>
        <input
          type="first-name"
          name="first-name"
          placeholder="First name"
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="last-name"
          name="last-name"
          placeholder="Last name"
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
        >
          SIGN UP
        </button>
        <div className="flex gap-2 text-sm text-gray-600 justify-center mt-4">
          <p>Don't have an account?</p>
          <Link href="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;
