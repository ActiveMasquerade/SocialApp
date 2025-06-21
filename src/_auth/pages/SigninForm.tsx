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
import { account } from "@/lib/appwrite/config";

const SigninForm = () => {
	const form = useForm<z.infer<typeof SigninValidation>>({
		resolver: zodResolver(SigninValidation),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const navigate = useNavigate();
	const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
	const { mutateAsync: signInAccount, isPending } = useSigninAccount();
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
				<img src="/assets/images/logo.svg" alt="Snapgram logo" className="h-10 mb-6" />

				<h2 className="text-2xl font-semibold md:text-3xl">Log in to your account</h2>
				<p className="text-sm text-muted-foreground mt-2 mb-6 text-center">
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
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" placeholder="you@example.com" {...field} />
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
									<Input type="password" placeholder="••••••••" {...field} />
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
						Sign in
					</Button>

					<p className="text-sm text-center text-gray-400">
						Don't have an account?
						<Link to="/sign-up" className="text-secondary ml-1 underline">
							Sign in
						</Link>
					</p>
				</form>
			</div>
		</Form>
	);
};

export default SigninForm;
