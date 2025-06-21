import * as z from "zod";

export const SignupSchema = z.object({
	name: z.string().min(2, { message: "too short" }),
	username: z.string().min(2, { message: "too short" }).max(50),
	password: z.string().min(8, { message: "too short" }),
	email: z.string().email(),
});
export const SigninValidation = z.object({
	email: z.string().email(),
	password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});
export const ProfileValidation = z.object({
	file: z.custom<File[]>(),
	name: z.string().min(2, { message: "Name must be at least 2 characters." }),
	username: z.string().min(2, { message: "Name must be at least 2 characters." }),
	email: z.string().email(),
	bio: z.string(),
});
export const PostValidation = z.object({
	caption: z
		.string()
		.min(5, { message: "Minimum 5 characters." })
		.max(2200, { message: "Maximum 2,200 caracters" }),
	file: z.custom<File[]>(),
	location: z
		.string()
		.min(1, { message: "This field is required" })
		.max(1000, { message: "Maximum 1000 characters." }),
	tags: z.string(),
});
