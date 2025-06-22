import { Route, Routes, Link, Outlet, useParams, useLocation } from "react-router-dom";
import LikedPosts from "@/_root/pages/LikedPosts";
import { useUserContext } from "@/Context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import GridPostList from "@/components/ui/shared/GridPostList";
import Loader from "@/components/ui/shared/Loader";

interface StabBlockProps {
	value: string | number;
	label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
	<div className="flex-center gap-2">
		<p className="small-semibold lg:body-bold text-primary-500">{value}</p>
		<p className="small-medium lg:base-medium text-light-2">{label}</p>
	</div>
);

const Profile = () => {
	const { id } = useParams();
	const { user } = useUserContext();
	const { pathname } = useLocation();

	const { data: currentUser } = useGetUserById(id || "");

	if (!currentUser)
		return (
			<div className="flex-center w-full h-full">
				<Loader />
			</div>
		);

	return (
		<div className="flex flex-col items-center flex-1 gap-10 overflow-scroll py-10 px-5 md:p-14">
			<div className="flex flex-col xl:flex-row gap-10 w-full max-w-6xl">
				{/* Profile Image */}
				<img
					src={currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"}
					alt="profile"
					className="w-28 h-28 lg:w-36 lg:h-36 rounded-full object-cover self-center xl:self-start ring-1 ring-[#2A2A2A]"
				/>

				{/* Info + Stats */}
				<div className="flex flex-col justify-between flex-1">
					{/* Name + Username */}
					<div>
						<h1 className="text-3xl font-semibold text-[#FAFAF5] text-center xl:text-left">
							{currentUser.name}
						</h1>
						<p className="text-sm text-[#8C7C73] text-center xl:text-left mt-1">
							@{currentUser.username}
						</p>
					</div>

					{/* Stats */}
					<div className="flex flex-wrap justify-center xl:justify-start gap-8 mt-8">
						<StatBlock value={currentUser.posts.length} label="Posts" />
						<StatBlock value={20} label="Followers" />
						<StatBlock value={20} label="Following" />
					</div>

					{/* Bio */}
					<p className="text-sm text-[#D3CCC7] mt-6 text-center xl:text-left max-w-2xl leading-relaxed">
						{currentUser.bio}
					</p>
				</div>

				{/* Action Buttons */}
				<div className="flex justify-center xl:justify-end items-start gap-4">
					{user.id === currentUser.$id ? (
						<Link
							to={`/update-profile/${currentUser.$id}`}
							className="flex items-center gap-2 h-11 px-4 bg-[#232E2A] hover:bg-[#2C3732] text-[#FAFAF5] rounded-md transition"
						>
							<img src="/assets/icons/edit.svg" alt="edit" width={18} height={18} />
							<span className="text-sm">Edit Profile</span>
						</Link>
					) : (
						<button
							type="button"
							className="h-11 px-6 bg-[#70451F] hover:bg-[#8A5628] text-white text-sm font-medium rounded-md transition-all"
						>
							Follow
						</button>
					)}
				</div>
			</div>

			{/* Navigation Tabs */}
			{currentUser.$id === user.id && (
				<div className="flex max-w-6xl w-full mt-10 rounded-lg overflow-hidden border border-[#2A2A2A] bg-[#1A1A1A]">
					<Link
						to={`/profile/${id}`}
						className={`flex items-center gap-2 px-5 py-2 flex-1 justify-center transition ${
							pathname === `/profile/${id}`
								? "bg-[#232E2A] text-[#FAFAF5]"
								: "text-[#8C7C73] hover:bg-[#151C1A]"
						}`}
					>
						<img src="/assets/icons/posts.svg" alt="posts" width={18} height={18} />
						Posts
					</Link>
					<Link
						to={`/profile/${id}/liked-posts`}
						className={`flex items-center gap-2 px-5 py-2 flex-1 justify-center transition ${
							pathname === `/profile/${id}/liked-posts`
								? "bg-[#232E2A] text-[#FAFAF5]"
								: "text-[#8C7C73] hover:bg-[#151C1A]"
						}`}
					>
						<img
							src="/assets/icons/like.svg"
							alt="liked posts"
							width={18}
							height={18}
						/>
						Liked Posts
					</Link>
				</div>
			)}

			{/* Posts Content */}
			<div className="w-full max-w-6xl mt-10">
				<Routes>
					<Route
						index
						element={<GridPostList posts={currentUser.posts} showUser={false} />}
					/>
					{currentUser.$id === user.id && (
						<Route path="liked-posts" element={<LikedPosts />} />
					)}
				</Routes>
				<Outlet />
			</div>
		</div>
	);
};

export default Profile;
