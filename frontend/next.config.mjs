import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
	swSrc: "app/sw.ts",
	swDest: "public/sw.js",
	disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
	i18n: {
		defaultLocale: "en",
		locales: ["en"],
	},
	/* config options here */
};

export default withSerwist(nextConfig);
