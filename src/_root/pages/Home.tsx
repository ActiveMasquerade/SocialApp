import type { Models } from "appwrite";
import Loader from "@/components/ui/shared/Loader";
import PostCard from "@/components/ui/shared/PostCard";
import UserCard from "@/components/ui/shared/UserCard";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queriesAndMutations";

const Home = () => {
	const { data: posts, isLoading: isPostLoading, isError: isErrorPosts } = useGetRecentPosts();
	const { data: creators, isLoading: isUserLoading, isError: isErrorCreators } = useGetUsers(10);
	if (isErrorPosts || isErrorCreators) {
		return (
			<div className="flex flex-1">
				<div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14">
					<p className="text-lg font-medium text-white">Something bad happened</p>
				</div>
				<div className="hidden xl:flex flex-col w-72 2xl:w-[465px] px-6 py-10 gap-10 overflow-scroll">
					<p className="text-lg font-medium text-white">Something bad happened</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-1">
			<div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14">
				<div className="max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9">
					<h2 className="text-2xl md:text-3xl font-bold leading-tight w-full text-left text-white">
						Home Feed
					</h2>
					{isPostLoading && !posts ? (
						<Loader />
					) : (
						<ul className="flex flex-col flex-1 gap-9 w-full">
							{posts?.documents.map((post: Models.Document) => {
								return (
									<li key={post.$id} className="flex justify-center w-full">
										<PostCard post={post} />
									</li>
								);
							})}
						</ul>
					)}
				</div>
			</div>

			<div className="hidden xl:flex flex-col w-72 2xl:w-[465px] px-6 py-10 gap-10 overflow-scroll">
				<h3 className="text-2xl font-bold leading-tight text-white">Top Creators</h3>
				{isUserLoading && !creators ? (
					<Loader />
				) : (
					<ul className="grid 2xl:grid-cols-2 gap-6">
						{creators?.documents.map((creator) => (
							<li key={creator?.$id}>
								<UserCard user={creator} />
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default Home;
