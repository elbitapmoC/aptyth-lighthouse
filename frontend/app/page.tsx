import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 sm:p-20 bg-background text-foreground">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">
          Welcome to Lighthouse Bible Platform
        </h1>
        <p className="text-lg mt-4">
          Your gateway to exploring the Word of God.
        </p>
      </header>
      <main className="flex flex-col items-center gap-8">
        <Image
          src="/lighthouse-logo.svg"
          alt="Lighthouse Bible Platform logo"
          width={200}
          height={200}
          priority
        />
        <Button variant="primary" size="lg" asChild>
          <a href="/bible">Start Reading</a>
        </Button>
      </main>
      <footer className="mt-12 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Lighthouse Bible Platform. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
}
