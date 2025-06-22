import type { Models } from "appwrite";

import GridPostList from "@/components/ui/shared/GridPostList";
import Loader from "@/components/ui/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";

const Saved = () => {
	const { data: currentUser } = useGetCurrentUser();

	const savePosts = currentUser?.save
		.map((savePost: Models.Document) => ({
			...savePost.post,
			creator: {
				imageUrl: currentUser.imageUrl,
			},
		}))
		.reverse();

	return (
		<div className="flex flex-col flex-1 items-center gap-10 overflow-auto py-10 px-5 md:px-14">
			<div className="flex items-center gap-3 w-full max-w-5xl">
				<img
					src="/assets/icons/save.svg"
					width={32}
					height={32}
					alt="save icon"
					className="invert"
				/>
				<h2 className="text-xl md:text-3xl font-semibold text-left text-stone-100">
					Saved Posts
				</h2>
			</div>

			{!currentUser ? (
				<Loader />
			) : savePosts.length === 0 ? (
				<p className="text-stone-400 text-center mt-12">No saved posts yet.</p>
			) : (
				<div className="w-full max-w-5xl">
					<GridPostList posts={savePosts} showStats={false} />
				</div>
			)}
		</div>
	);
};

export default Saved;
