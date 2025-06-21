import { Link, useNavigate } from "react-router-dom";
import { Button } from "../button";
import { signoutAccount } from "@/lib/appwrite/api";
import { useSignoutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/Context/AuthContext";
const TopBar = () => {
	const { mutate: signout, isSuccess } = useSignoutAccount();
	const { user } = useUserContext();
	const navigate = useNavigate();
	useEffect(() => {
		if (isSuccess) {
			navigate("/sign-in");
		}
	}, [isSuccess]);
	return (
		<section className="sticky top-0 z-50 md:hidden bg-[#09090A]">
			<div className="flex justify-between items-center px-4 py-3 max-w-7xl mx-auto">
				<Link to="/" className="flex items-center gap-2">
					<img
						src="/assets/images/logo.svg"
						alt="logo"
						width={130}
						height={32}
						className="object-contain"
					/>
				</Link>

				<div className="flex items-center gap-4">
					<Button
						variant="ghost"
						className="p-2 hover:bg-transparent hover:text-white"
						onClick={() => signout()}
					>
						<img src="/assets/icons/logout.svg" alt="logout" className="h-5 w-5" />
					</Button>

					<Link to={`/profile/${user.id}`}>
						<img
							src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
							alt="profile"
							className="h-8 w-8 rounded-full object-cover"
						/>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default TopBar;
