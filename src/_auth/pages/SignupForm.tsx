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

import { useCreateUserAccount } from "@/lib/react-query/queriesAndMutations";

const SignupForm = () => {
	const { mutateAsync: createUserAccount } = useCreateUserAccount();
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

				<h2 className="text-2xl font-semibold md:text-3xl text-center text-stone-100">
					Create a new account
				</h2>
				<p className="text-sm text-stone-400 mt-2 mb-6 text-center">
					To use Snapgram, please enter your details below.
				</p>

				<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-stone-300">Name</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="John Doe"
										{...field}
										className="bg-stone-800 text-white border-stone-600 placeholder-stone-500"
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
								<FormLabel className="text-stone-300">Username</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="username"
										{...field}
										className="bg-stone-800 text-white border-stone-600 placeholder-stone-500"
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
								<FormLabel className="text-stone-300">Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="john@example.com"
										{...field}
										className="bg-stone-800 text-white border-stone-600 placeholder-stone-500"
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
								<FormLabel className="text-stone-300">Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder="••••••••"
										{...field}
										className="bg-stone-800 text-white border-stone-600 placeholder-stone-500"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						className="w-full bg-stone-700 hover:bg-stone-600 text-white font-semibold"
					>
						Sign Up
					</Button>

					<p className="text-sm text-center text-stone-400">
						Already have an account?
						<Link
							to="/sign-in"
							className="text-stone-200 ml-1 underline hover:text-stone-50"
						>
							Log in
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SignupForm;
