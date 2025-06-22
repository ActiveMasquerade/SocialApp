import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Loader from "@/components/ui/shared/Loader";
import { toast } from "sonner";
import { ProfileValidation } from "@/lib/validation";
import { useUserContext } from "@/Context/AuthContext";
import { useGetUserById, useUpdateUser } from "@/lib/react-query/queriesAndMutations";
import ProfileUploader from "@/components/ui/shared/ProfileUploader";

const UpdateProfile = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { user, setUser } = useUserContext();
	const form = useForm<z.infer<typeof ProfileValidation>>({
		resolver: zodResolver(ProfileValidation),
		defaultValues: {
			file: [],
			name: user.name,
			username: user.username,
			email: user.email,
			bio: user.bio || "",
		},
	});

	// Queries
	const { data: currentUser } = useGetUserById(id || "");
	const { mutateAsync: updateUser, isPending: isLoadingUpdate } = useUpdateUser();

	if (!currentUser)
		return (
			<div className="flex-center w-full h-full">
				<Loader />
			</div>
		);

	// Handler
	const handleUpdate = async (value: z.infer<typeof ProfileValidation>) => {
		const updatedUser = await updateUser({
			userId: currentUser.$id,
			name: value.name,
			bio: value.bio,
			file: value.file,
			imageUrl: currentUser.imageUrl,
			imageId: currentUser.imageId,
		});

		if (!updatedUser) {
			toast.error(`Update user failed. Please try again.`);
		}

		setUser({
			...user,
			name: updatedUser?.name,
			bio: updatedUser?.bio,
			imageUrl: updatedUser?.imageUrl,
		});
		return navigate(`/profile/${id}`);
	};

	return (
		<div className="flex flex-1">
			<div className="flex flex-col flex-1 items-center gap-10 overflow-auto py-10 px-5 md:px-8 lg:px-14">
				<div className="flex items-center gap-3 w-full max-w-5xl">
					<img
						src="/assets/icons/edit.svg"
						width={32}
						height={32}
						alt="edit"
						className="invert"
					/>
					<h2 className="text-xl md:text-3xl font-semibold text-stone-100">
						Edit Profile
					</h2>
				</div>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleUpdate)}
						className="flex flex-col gap-7 w-full max-w-5xl"
					>
						<FormField
							control={form.control}
							name="file"
							render={({ field }) => (
								<FormItem className="flex">
									<FormControl>
										<ProfileUploader
											fieldChange={field.onChange}
											mediaUrl={currentUser.imageUrl}
										/>
									</FormControl>
									<FormMessage className="text-sm text-red-500 mt-1" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-stone-300 text-sm font-medium">
										Name
									</FormLabel>
									<FormControl>
										<Input
											type="text"
											className="bg-stone-900 text-stone-100 border border-stone-700 p-2 rounded-md"
											{...field}
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
									<FormLabel className="text-stone-300 text-sm font-medium">
										Username
									</FormLabel>
									<FormControl>
										<Input
											type="text"
											disabled
											className="bg-stone-800 text-stone-500 border border-stone-700 p-2 rounded-md"
											{...field}
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
									<FormLabel className="text-stone-300 text-sm font-medium">
										Email
									</FormLabel>
									<FormControl>
										<Input
											type="text"
											disabled
											className="bg-stone-800 text-stone-500 border border-stone-700 p-2 rounded-md"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="bio"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-stone-300 text-sm font-medium">
										Bio
									</FormLabel>
									<FormControl>
										<Textarea
											className="bg-stone-900 text-stone-100 border border-stone-700 p-3 rounded-md custom-scrollbar"
											rows={4}
											{...field}
										/>
									</FormControl>
									<FormMessage className="text-sm text-red-500 mt-1" />
								</FormItem>
							)}
						/>

						<div className="flex gap-4 justify-end">
							<Button
								type="button"
								className="bg-stone-800 text-stone-300 hover:bg-stone-700 px-5 py-2 rounded-md"
								onClick={() => navigate(-1)}
							>
								Cancel
							</Button>
							<Button
								type="submit"
								className="bg-stone-100 text-stone-900 font-semibold hover:bg-white px-5 py-2 rounded-md"
								disabled={isLoadingUpdate}
							>
								{isLoadingUpdate && <Loader />}
								Update Profile
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default UpdateProfile;
