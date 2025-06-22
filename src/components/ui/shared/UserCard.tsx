import type { Models } from "appwrite";
import { Link } from "react-router-dom";

import { Button } from "../button";

type UserCardProps = {
	user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
	return (
		<Link
			to={`/profile/${user.$id}`}
			className="flex flex-col items-center gap-5 bg-[#190e19] rounded-3xl border border-[#2e2a2d] px-6 py-8 hover:shadow-md shadow-[0_1px_2px_rgba(0,0,0,0.4)] transition"
		>
			<img
				src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
				alt="creator"
				className="rounded-full w-16 h-16 object-cover ring-1 ring-[#2A2A2A]"
			/>

			<div className="flex flex-col items-center gap-1">
				<p className="text-base font-semibold text-[#FAFAF5] text-center line-clamp-1">
					{user.name}
				</p>
				<p className="text-sm text-[#8C7C73] text-center line-clamp-1">@{user.username}</p>
			</div>

			<Button
				type="button"
				size="sm"
				className="bg-[#70451F] text-white text-sm font-semibold px-5 py-2 rounded-md hover:bg-[#212c29] cursor-pointer transition-all shadow-sm"
			>
				Follow
			</Button>
		</Link>
	);
};

export default UserCard;
