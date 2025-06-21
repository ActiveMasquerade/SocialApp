import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { SignupSchema } from "@/lib/validation";

import { useCreateUserAccount, useSigninAccount } from "@/lib/react-query/queriesAndMutations";
import { signinAccount } from "@/lib/appwrite/api";

const SignupForm = () => {
	const { mutateAsync: createUserAccount, isPending } = useCreateUserAccount();
	const form = useForm<z.infer<typeof SignupSchema>>({
		resolver: zodResolver(SignupSchema),
		defaultValues: {
			username: "",
			password: "",
			email: "",
			name: "",
		},
	});
	async function onSubmit(values: z.infer<typeof SignupSchema>) {
		try {
			const newUser = await createUserAccount(values);
			if (!newUser) {
				throw Error;
			}
			toast.success("user has been created");
		} catch {
			toast("signup failed");
		}
	}
	return (
		<Form {...form}>
			<div className="min-h-screen px-4 py-8 flex flex-col justify-center items-center w-full max-w-md mx-auto">
				<img src="/assets/images/logo.svg" alt="logo" className="h-10 mb-6" />

				<h2 className="text-2xl font-semibold md:text-3xl text-center">
					Create a new account
				</h2>
				<p className="text-sm text-gray-500 mt-2 mb-6 text-center">
					To use Snapgram, please enter your details below.
				</p>

				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="John Doe"
										{...field}
										className="border-none"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="username"
										{...field}
										className="border-none"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="john@example.com"
										{...field}
										className="border-none"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="••••••••"
										{...field}
										className="border-none"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						variant="outline"
						className="w-full hover:opacity-80 hover:cursor-pointer"
					>
						Sign Up
					</Button>

					<p className="text-sm text-center text-gray-400">
						Already have an account?
						<Link to="/sign-in" className="text-secondary ml-1 underline">
							Log in
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SignupForm;
