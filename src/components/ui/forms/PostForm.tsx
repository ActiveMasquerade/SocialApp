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
				<FormField
					control={form.control}
					name="caption"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-white !important">Caption</FormLabel>
							<FormControl>
								<Textarea
									className="h-36 bg-dark-3 rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-red" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="file"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-white">Add Photos</FormLabel>
							<FormControl>
								<FileUploader
									fieldChange={field.onChange}
									mediaUrl={post?.imageUrl}
								/>
							</FormControl>
							<FormMessage className="text-red" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="location"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-white">Add Location</FormLabel>
							<FormControl>
								<Input
									type="text"
									className="h-12 bg-dark-4 border-none placeholder:text-[#ccc] focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#ddd]  "
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-red" />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="tags"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-white">
								Add Tags (separated by comma " , ")
							</FormLabel>
							<FormControl>
								<Input
									placeholder="Art, Expression, Learn"
									type="text"
									className="h-12 bg-dark-4 border-none placeholder:text-[#ccc] focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-[#ddd] "
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-red" />
						</FormItem>
					)}
				/>

				<div className="flex gap-4 items-center justify-end">
					<Button
						type="button"
						className="h-12 bg-[#1F1F22] px-5 text-white flex gap-2 cursor-pointer !important"
						onClick={() => navigate(-1)}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						className="bg-primary text-black cursor-pointer flex gap-2 whitespace-nowrap !important "
					>
						{action} Post
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default PostForm;
