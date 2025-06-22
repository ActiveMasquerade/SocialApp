import * as z from "zod";
import type { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostValidation } from "@/lib/validation";
import { useUserContext } from "@/Context/AuthContext";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Button } from "../button";
import { Input } from "../input";
import { Textarea } from "../textarea";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations";
import FileUploader from "../shared/FileUploader";

type PostFormProps = {
	post?: Models.Document;
	action: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
	const navigate = useNavigate();
	const { user } = useUserContext();
	const form = useForm<z.infer<typeof PostValidation>>({
		resolver: zodResolver(PostValidation),
		defaultValues: {
			caption: post ? post?.caption : "",
			file: [],
			location: post ? post.location : "",
			tags: post ? post.tags.join(",") : "",
		},
	});
	const { mutateAsync: createPost } = useCreatePost();
	const { mutateAsync: updatePost } = useUpdatePost();
	const handleSubmit = async (value: z.infer<typeof PostValidation>) => {
		// ACTION = UPDATE
		if (post && action === "Update") {
			const updatedPost = await updatePost({
				...value,
				postId: post.$id,
				imageId: post.imageId,
				imageUrl: post.imageUrl,
			});

			if (!updatedPost) {
				toast.error(`${action} post failed. Please try again.`);
			}
			return navigate(`/posts/${post.$id}`);
		}

		const newPost = await createPost({
			...value,
			userId: user.id,
		});

		if (!newPost) {
			toast.error(`${action} post failed. Please try again.`);
		}
		navigate("/");
	};
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className="flex flex-col gap-9 w-full max-w-5xl"
			>
				{/* Caption */}
				<FormField
					control={form.control}
					name="caption"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-[#FAFAF5]">Caption</FormLabel>
							<FormControl>
								<Textarea
									className="h-36 bg-[#232E2A] text-[#F5F3F0] placeholder:text-[#8C7C73] rounded-xl border border-[#2C2C28] focus-visible:ring-2 focus-visible:ring-[#70451F] focus-visible:ring-offset-0"
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-[#D94A38]" />
						</FormItem>
					)}
				/>

				{/* File */}
				<FormField
					control={form.control}
					name="file"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-[#FAFAF5]">Add Photos</FormLabel>
							<FormControl>
								<FileUploader
									fieldChange={field.onChange}
									mediaUrl={post?.imageUrl}
								/>
							</FormControl>
							<FormMessage className="text-[#D94A38]" />
						</FormItem>
					)}
				/>

				{/* Location */}
				<FormField
					control={form.control}
					name="location"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-[#FAFAF5]">Add Location</FormLabel>
							<FormControl>
								<Input
									type="text"
									className="h-12 bg-[#1E1A1C] text-[#F5F3F0] placeholder:text-[#8C7C73] rounded-xl border border-[#2C2C28] focus-visible:ring-2 focus-visible:ring-[#70451F] focus-visible:ring-offset-0"
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-[#D94A38]" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-[#FAFAF5]">
								Add Tags (comma separated)
							</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="Art, Expression, Learn"
									className="h-12 bg-[#1E1A1C] text-[#F5F3F0] placeholder:text-[#8C7C73] rounded-xl border border-[#2C2C28] focus-visible:ring-2 focus-visible:ring-[#70451F] focus-visible:ring-offset-0"
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-[#D94A38]" />
						</FormItem>
					)}
				/>

				{/* Buttons */}
				<div className="flex gap-4 items-center justify-end">
					<Button
						type="button"
						className="h-12 bg-[#2C2426] text-[#F5F3F0] hover:bg-[#3A3132] rounded-md px-5"
						onClick={() => navigate(-1)}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						className="bg-[#70451F] hover:bg-[#8A5628] text-white font-semibold px-6 py-2 rounded-md shadow-sm"
					>
						{action} Post
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default PostForm;
