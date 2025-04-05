module.exports = {
	globDirectory: ".",
	globPatterns: [
		"**/*.{js,css,html,png,jpg,jpeg,svg,gif,woff,woff2,eot,ttf,otf}",
	],
	swDest: "public/sw.js",
	clientsClaim: true,
	skipWaiting: true,
	runtimeCaching: [
		{
			urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/,
			handler: "CacheFirst",
			options: {
				cacheName: "google-fonts",
				expiration: {
					maxEntries: 30,
				},
				cacheableResponse: {
					statuses: [0, 200],
				},
			},
		},
		{
			urlPattern: /\.(?:png|jpg|jpeg|gif|svg)$/,
			handler: "CacheFirst",
			options: {
				cacheName: "images",
				expiration: {
					maxEntries: 60,
					maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
				},
			},
		},
	],
};
