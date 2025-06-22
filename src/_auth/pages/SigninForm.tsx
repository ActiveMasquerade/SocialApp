import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninValidation } from "@/lib/validation";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSigninAccount } from "../../lib/react-query/queriesAndMutations";
import { useUserContext } from "@/Context/AuthContext";
import { Button } from "@/components/ui/button";

const SigninForm = () => {
	const form = useForm<z.infer<typeof SigninValidation>>({
		resolver: zodResolver(SigninValidation),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const navigate = useNavigate();
	const { checkAuthUser } = useUserContext();
	const { mutateAsync: signInAccount } = useSigninAccount();
	const handleSignin = async (user: z.infer<typeof SigninValidation>) => {
		try {
			const session = await signInAccount(user);

			if (!session) {
				toast.error("Login failed. Please try again.");
				return;
			}

			const isLoggedIn = await checkAuthUser();
			if (isLoggedIn) {
				form.reset();
				navigate("/");
			} else {
				toast.error("Login failed. Please try again.");
			}
		} catch (error) {
			toast.error("An unexpected error occurred.");
		}
	};
	return (
		<Form {...form}>
			<div className="min-h-screen px-4 py-8 flex flex-col justify-center items-center w-full max-w-md mx-auto">
				<img src="/assets/images/logo.svg" alt="logo" className=" w-64 mb-6" />

				<h2 className="text-2xl font-semibold text-stone-100 md:text-3xl">
					Log in to your account
				</h2>
				<p className="text-sm text-stone-400 mt-2 mb-6 text-center">
					Welcome back! Please enter your details.
				</p>

				<form
					onSubmit={form.handleSubmit(handleSignin)}
					className="flex flex-col gap-4 w-full"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-stone-300">Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="you@example.com"
										className="bg-stone-800 text-white border-stone-600 placeholder-stone-500"
										{...field}
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
										className="bg-stone-800 text-white border-stone-600 placeholder-stone-500"
										{...field}
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
						Sign in
					</Button>

					<p className="text-sm text-center text-stone-400">
						Don't have an account?
						<Link
							to="/sign-up"
							className="text-stone-200 ml-1 underline hover:text-stone-50"
						>
							Sign up
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SigninForm;
