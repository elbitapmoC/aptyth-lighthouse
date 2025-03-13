import Link from "next/link";

export default function HomePage() {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
			<div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
				<h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
					Lighthouse Bible Platform
				</h1>

				<p className="text-gray-600 text-center mb-8">
					A platform for Bible study and exploration.
				</p>

				<div className="space-y-4">
					<Link
						href="/login"
						className="block w-full py-2 px-4 bg-blue-500 text-white text-center rounded hover:bg-blue-600 transition"
					>
						Login
					</Link>

					<Link
						href="/register"
						className="block w-full py-2 px-4 border border-blue-500 text-blue-500 text-center rounded hover:bg-blue-50 transition"
					>
						Register
					</Link>
				</div>
			</div>
		</div>
	);
}
