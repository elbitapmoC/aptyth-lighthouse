'use client';

export default function Hero() {
  return (
    <section className="bg-blue-50 py-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          Welcome to the Lighthouse Bible Platform
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Dive into scripture, explore powerful features, and grow in your understanding with a modern platform designed for Bible study and exploration.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="#features"
            className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Explore Features
          </a>
          <a
            href="#"
            className="px-6 py-3 bg-gray-100 text-gray-800 rounded-md text-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}
