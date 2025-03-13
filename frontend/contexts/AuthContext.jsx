"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, logoutUser } from "../lib/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Check if user is logged in on initial load
		const loadUser = async () => {
			try {
				const userData = await getCurrentUser();
				setUser(userData);
			} catch (error) {
				console.error("Failed to load user:", error);
			} finally {
				setLoading(false);
			}
		};

		loadUser();
	}, []);

	const login = (userData) => {
		setUser(userData.user);
	};

	const logout = () => {
		logoutUser();
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
