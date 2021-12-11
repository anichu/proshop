import bcrypt from "bcryptjs";

const users = [
	{
		name: "Admin User",
		email: "admin@example.com",
		password: bcrypt.hashSync("anis", 10),
		isAdmin: true,
	},
	{
		name: "anis molla",
		email: "anis@gmail.com",
		password: bcrypt.hashSync("anis", 10),
	},
	{
		name: "ashik",
		email: "ashik@gmail.com",
		password: bcrypt.hashSync("anis", 10),
	},
];

export default users;
