import Link from "next/link";

const GeneralCenterComponent = ({ text }: { text: string }) => {
  return (
    <div className="w-full mt-24 flex justify-center items-center flex-col">
      <h2 className="text-2xl">{text}</h2>
      <Link href="/login" className="text-lg text-blue-400 font-semibold">
        Login
      </Link>
    </div>
  );
};

export default GeneralCenterComponent;
