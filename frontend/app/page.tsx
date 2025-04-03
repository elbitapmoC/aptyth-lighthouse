import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
      <p className="mt-4 text-lg">This is a simple Next.js application.</p>
      <Image
        src="/next.svg"
        alt="Next.js Logo"
        width={300}
        height={300}
        className="mt-8"
      />
    </div>
  );
}
