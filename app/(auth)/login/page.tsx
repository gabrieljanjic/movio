"use client";

import { loginUser } from "@/lib/actions/userActions";
import Link from "next/link";
import { useState } from "react";

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);

  return (
    <section className="w-full h-screen flex items-center justify-center px-2">
      <div className=" bg-white p-8 rounded-2xl w-full max-w-md flex flex-col items-center gap-6 custom-box-shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold">Movio</h1>
          <h3 className="text-sm text-gray-500 tracking-widest">COMMUNITY</h3>
        </div>
        <form
          className="w-full flex flex-col gap-4"
          action={async (formData: FormData) => {
            try {
              setError(null);
              await loginUser(formData);
            } catch (err) {
              if (err instanceof Error) {
                setError(err.message);
              } else {
                setError(String(err));
              }
            }
          }}
        >
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
            LOG IN
          </button>
        </form>

        <div className="flex gap-2 text-sm text-gray-600">
          <p>Don&apos;t forget me</p>{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
