"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../lib/auth";

export default function Dashboard() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		async function loadUser() {
			try {
				const userData = await getCurrentUser();
				if (!userData) {
					router.push("/login");
					return;
				}
				setUser(userData);
			} catch (error) {
				console.error("Failed to load user:", error);
				router.push("/login");
			} finally {
				setLoading(false);
			}
		}

		loadUser();
	}, [router]);

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
			</div>
		);
	}

	return (
		<div className="container mx-auto py-10 px-4">
			<div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
				<h1 className="text-2xl font-bold mb-6">Dashboard</h1>

				{user ? (
					<div className="space-y-4">
						<div className="bg-blue-50 p-4 rounded-lg">
							<h2 className="text-xl font-semibold mb-2">
								Welcome, {user.name}!
							</h2>
							<p className="text-gray-600">You are successfully logged in.</p>
						</div>

						<div className="border rounded-lg p-4">
							<h3 className="font-medium mb-2">Your Account Information</h3>
							<ul className="space-y-2">
								<li>
									<span className="font-medium">ID:</span> {user.id}
								</li>
								<li>
									<span className="font-medium">Email:</span> {user.email}
								</li>
								<li>
									<span className="font-medium">Name:</span> {user.name}
								</li>
							</ul>
						</div>

						<div className="mt-6 flex justify-between">
							<button
								onClick={() => {
									localStorage.removeItem("authToken");
									router.push("/login");
								}}
								type="button"
								className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
							>
								Logout
							</button>
						</div>
					</div>
				) : (
					<div className="text-center py-8">
						<p className="text-gray-600 mb-4">You are not logged in.</p>
						<Link
							href="/login"
							className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
						>
							Go to Login
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
