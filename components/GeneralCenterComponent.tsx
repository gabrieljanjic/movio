import Link from "next/link";

const GeneralCenterComponent = ({
  text,
  login,
}: {
  text: string;
  login: boolean;
}) => {
  return (
    <article className="w-full flex justify-center items-center px-4 py-16 md:py-24">
      <div className="text-center max-w-md space-y-5">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 bg-blue-100 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute inset-4 bg-blue-200 rounded-full opacity-75"></div>
          <div className="absolute inset-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-3xl font-bold">!</span>
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{text}</h2>
        {login && (
          <div className="space-y-3 pt-2">
            <Link
              href="/login"
              className="block w-full sm:w-auto sm:inline-block px-3 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Log in
            </Link>
          </div>
        )}
      </div>
    </article>
  );
};

export default GeneralCenterComponent;
