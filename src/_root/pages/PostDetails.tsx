import { useParams, Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/shared/Loader";
import GridPostList from "@/components/ui/shared/GridPostList";
import PostStats from "@/components/ui/shared/PostStats";

import {
	useGetPostById,
	useGetUserPosts,
	useDeletePost,
} from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/Context/AuthContext";

const PostDetails = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { user } = useUserContext();

	const { data: post, isLoading } = useGetPostById(id);
	const { data: userPosts, isLoading: isUserPostLoading } = useGetUserPosts(post?.creator.$id);
	const { mutate: deletePost } = useDeletePost();

	const relatedPosts = userPosts?.documents.filter((userPost) => userPost.$id !== id);

	const handleDeletePost = () => {
		deletePost({ postId: id, imageId: post?.imageId });
		navigate(-1);
	};

	return (
		<div className="flex flex-col flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14 custom-scrollbar items-center">
			{/* Back Button */}
			<div className="hidden md:flex w-full">
				<Button
					onClick={() => navigate(-1)}
					variant="ghost"
					className="flex items-center gap-2 text-stone-300 hover:text-white"
				>
					<img src="/assets/icons/back.svg" alt="back" className="w-6 h-6" />
					<p className="text-sm font-medium">Back</p>
				</Button>
			</div>

			{isLoading || !post ? (
				<Loader />
			) : (
				<div className="flex flex-col lg:flex-row gap-8 w-full bg-stone-900 border border-stone-700 rounded-2xl p-5 lg:p-8">
					{/* Image */}
					<img
						src={post.imageUrl}
						alt="post"
						className="w-full lg:max-w-md h-[400px] object-cover rounded-xl"
					/>

					{/* Post Info */}
					<div className="flex flex-col flex-1 justify-between gap-6">
						{/* Creator Header */}
						<div className="flex justify-between items-start">
							<Link
								to={`/profile/${post.creator.$id}`}
								className="flex items-center gap-4"
							>
								<img
									src={
										post.creator.imageUrl ||
										"/assets/icons/profile-placeholder.svg"
									}
									alt="creator"
									className="w-12 h-12 rounded-full"
								/>
								<div>
									<p className="text-lg font-semibold text-white">
										{post.creator.name}
									</p>
									<p className="text-sm text-stone-400">
										{multiFormatDateString(post.$createdAt)} • {post.location}
									</p>
								</div>
							</Link>

							{user.id === post.creator.$id && (
								<div className="flex gap-4">
									<Link to={`/update-post/${post.$id}`}>
										<img
											src="/assets/icons/edit.svg"
											alt="edit"
											className="w-6 h-6"
										/>
									</Link>
									<Button
										onClick={handleDeletePost}
										variant="ghost"
										className="p-0"
									>
										<img
											src="/assets/icons/delete.svg"
											alt="delete"
											className="w-6 h-6"
										/>
									</Button>
								</div>
							)}
						</div>

						{/* Caption & Tags */}
						<div>
							<p className="text-base text-stone-200">{post.caption}</p>
							<ul className="flex gap-2 flex-wrap mt-3">
								{post.tags.map((tag: string, index: string) => (
									<li key={`${tag}-${index}`} className="text-sm text-stone-400">
										#{tag}
									</li>
								))}
							</ul>
						</div>

						{/* Stats */}
						<PostStats post={post} userId={user.id} />
					</div>
				</div>
			)}

			{/* Related Posts */}
			<div className="w-full">
				<hr className="border-t border-stone-700 my-10" />
				<h3 className="text-2xl font-semibold mb-6">More Related Posts</h3>
				{isUserPostLoading || !relatedPosts ? (
					<Loader />
				) : (
					<GridPostList posts={relatedPosts} />
				)}
			</div>
		</div>
	);
};

export default PostDetails;
