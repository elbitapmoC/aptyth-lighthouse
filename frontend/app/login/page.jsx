"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "../../lib/auth";

export default function LoginPage() {
	const [credentials, setCredentials] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCredentials((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			await loginUser(credentials);
			router.push("/dashboard");
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container mx-auto py-10 px-4">
			<div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
				<h1 className="text-2xl font-bold mb-6">Login</h1>

				{error && (
					<div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
						{error}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700 mb-2" htmlFor="email">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={credentials.email}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
						/>
					</div>

					<div className="mb-6">
						<label className="block text-gray-700 mb-2" htmlFor="password">
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={credentials.password}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 disabled:bg-blue-300"
					>
						{loading ? "Logging in..." : "Login"}
					</button>
				</form>

				<div className="mt-4 text-center">
					<p>
						Don't have an account?{" "}
						<Link href="/register" className="text-blue-500 hover:underline">
							Register here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
