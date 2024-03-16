export default {
	schema: './src/config/db/schema.ts',
	out: './.migrations',
	driver: 'libsql',
	dbCredentials: process.env.ENV === "prod" ? {
		url: 'file:./.data/local.sqlite'
	} : {
		url: process.env.DB_URL,
		authToken: process.env.DB_AUTH_TOKEN
	},

	breakpoints: true
}

