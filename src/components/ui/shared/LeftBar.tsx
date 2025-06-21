import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../button";
import { useSignoutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/Context/AuthContext";
import { sidebarLinks } from "@/constants/index";
import type { INavLink } from "@/types";
const LeftBar = () => {
	const { mutateAsync: signout, isSuccess, isPending } = useSignoutAccount();

	const handleSignOut = async () => {
		try {
			await signout();
			navigate("/sign-in");
			console.log("Signed out!");
		} catch (error) {
			console.error("Signout failed", error);
		}
	};

	const { pathname } = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		if (isSuccess) {
			navigate("/sign-in");
		}
	}, [isSuccess]);
	const { user } = useUserContext();
	return (
		<nav className="hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px] bg-[#09090A]">
			<div className="flex flex-col gap-11">
				<Link to="/" className="flex items-center gap-2">
					<img
						src="/assets/images/logo.svg"
						alt="logo"
						width={170}
						height={36}
						className="object-contain"
					/>
				</Link>
				<Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
					<img
						src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
						alt="profile"
						className="h-8 w-8 rounded-full object-cover"
					/>
					<div className="flex flex-col">
						<p className="text-[18px] font-bold leading-[140%]">{user.name}</p>
						<p className="text-[14px] font-normal leading-[140%] text-[#7878A3]">
							{user.username}
						</p>
					</div>
				</Link>
				<ul className="flex flex-col gap-6">
					{sidebarLinks.map((link: INavLink) => {
						const isActive = pathname == link.route;
						return (
							<li
								key={link.label}
								className={`rounded-lg base-medium hover:bg-[#473429] transition group ${
									isActive && "bg-[#473429]"
								}`}
							>
								<NavLink
									to={link.route}
									className={
										"gap-4 flex p-4 group-hover:invert group-hover:brightness-0 group-hover:transition"
									}
								>
									<img
										src={link.imgURL}
										alt="logo"
										className={`group-hover:invert group-hover:brightness-0 group-hover:transition ${
											isActive && "invert brightness-0 transition"
										}`}
									/>
									{link.label}
								</NavLink>
							</li>
						);
					})}
				</ul>
			</div>
			<Button
				disabled={isPending}
				variant="ghost"
				className="p-2 hover:bg-transparent hover:text-white"
				onClick={handleSignOut}
			>
				<img src="/assets/icons/logout.svg" alt="logout" className="h-5 w-5" />
				Logout
			</Button>
		</nav>
	);
};

export default LeftBar;
