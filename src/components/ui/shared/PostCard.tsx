import type { Models } from "appwrite";
import { Link } from "react-router-dom";

import PostStats from "@/components/ui/shared/PostStats";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/Context/AuthContext";

type PostCardProps = {
	post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
	const { user } = useUserContext();

	if (!post.creator) return;

	return (
		<div className="bg-[#190e19] rounded-3xl border border-[#2e2a2d] p-5 lg:p-7 w-full max-w-screen-sm">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-3">
					<Link to={`/profile/${post.creator.$id}`}>
						<img
							src={post.creator?.imageUrl || "/assets/icons/profile-placeholder.svg"}
							alt="creator"
							className="w-12 h-12 rounded-full object-cover ring-1 ring-[#1F1A1E]"
						/>
					</Link>

					<div className="flex flex-col">
						<p className="text-[16px] font-medium lg:text-[18px] lg:font-bold leading-[140%] text-[#FAFAF5]">
							{post.creator.name}
						</p>
						<div className="flex items-center gap-2 text-[#8C7C73]">
							<p className="text-[12px] font-semibold lg:text-[14px] lg:font-normal leading-[140%]">
								{multiFormatDateString(post.$createdAt)}
							</p>
							•
							<p className="text-[12px] font-semibold lg:text-[14px] lg:font-normal leading-[140%]">
								{post.location}
							</p>
						</div>
					</div>
				</div>

				{user.id === post.creator.$id && (
					<Link to={`/update-post/${post.$id}`}>
						<img
							src={"/assets/icons/edit.svg"}
							alt="edit"
							width={20}
							height={20}
							className="brightness-[1.8] hover:brightness-[2.4] transition"
						/>
					</Link>
				)}
			</div>

			<Link to={`/posts/${post.$id}`}>
				<div className="text-[14px] font-medium lg:text-[16px] lg:font-medium leading-[140%] py-5 text-[#FAFAF5]">
					<p>{post.caption}</p>
					<ul className="flex gap-2 mt-2 flex-wrap">
						{post.tags.map((tag: string, index: string) => (
							<li
								key={`${tag}${index}`}
								className="text-[#70451F] text-[14px] font-normal leading-[140%] hover:text-[#8A5628] hover:underline cursor-pointer"
							>
								#{tag}
							</li>
						))}
					</ul>
				</div>

				<img
					src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
					alt="post image"
					className="h-64 xs:h-[400px] lg:h-[450px] w-full rounded-[24px] object-cover mb-5 border border-[#1F1A1E]"
				/>
			</Link>

			<PostStats post={post} userId={user.id} />
		</div>
	);
};

export default PostCard;
