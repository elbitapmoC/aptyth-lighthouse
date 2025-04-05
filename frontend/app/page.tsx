import Image from "next/image";

async function getData() {
  const res = await fetch("http://localhost:8000/health");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <p className="mt-4 text-lg">This is a simple Next.js application.</p>
      <p className="mt-4 text-lg">Backend Status: {data.status}</p>
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
