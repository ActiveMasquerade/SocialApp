import type { Models } from "appwrite";
import { Link } from "react-router-dom";

import PostStats from "@/components/ui/shared/PostStats";
import { useUserContext } from "@/Context/AuthContext";

type GridPostListProps = {
	posts: Models.Document[];
	showUser?: boolean;
	showStats?: boolean;
};

const GridPostList = ({ posts, showUser = true, showStats = true }: GridPostListProps) => {
	const { user } = useUserContext();

	return (
		<ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
			{posts.map((post) => (
				<li key={post.$id} className="relative h-80">
					<Link to={`/posts/${post.$id}`} className="block w-full h-full">
						<img
							src={post.imageUrl}
							alt="post"
							className="w-full h-full object-cover rounded-lg"
						/>
					</Link>

					<div className="absolute bottom-2 left-2 right-2 bg-black/40 text-white px-3 py-2 rounded-md flex items-center justify-between text-sm">
						{showUser && (
							<div className="flex items-center gap-2">
								<img
									src={
										post.creator.imageUrl ||
										"/assets/icons/profile-placeholder.svg"
									}
									alt="creator"
									className="w-6 h-6 rounded-full"
								/>
								<p className="truncate">{post.creator.name}</p>
							</div>
						)}
						{showStats && <PostStats post={post} userId={user.id} />}
					</div>
				</li>
			))}
		</ul>
	);
};

export default GridPostList;
