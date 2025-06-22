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
			window.location.reload();
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
		<nav className="hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px] bg-[#0D060F] border-r border-[#1A1A1A]">
			<div className="flex flex-col gap-10">
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
						className="h-8 w-8 rounded-full object-cover ring-1 ring-[#1E2824]"
					/>
					<div className="flex flex-col">
						<p className="text-[18px] font-bold leading-[140%] text-[#FAFAF5]">
							{user.name}
						</p>
						<p className="text-[14px] font-normal leading-[140%] text-[#D3CCC7]">
							@{user.username}
						</p>
					</div>
				</Link>

				<ul className="flex flex-col gap-2">
					{sidebarLinks.map((link: INavLink) => {
						const isActive = pathname === link.route;
						return (
							<li
								key={link.label}
								className={`rounded-xl base-medium transition group ${
									isActive ? "bg-[#332518]" : "hover:bg-[#212c29]"
								}`}
							>
								<NavLink
									to={link.route}
									className="flex items-center gap-4 p-4 text-[#F0ECE9] group-hover:text-white transition"
								>
									<img
										src={link.imgURL}
										alt={link.label}
										className={`w-5 h-5 transition ${
											isActive
												? "filter brightness-[1.9] contrast-[1.3]"
												: "filter brightness-100 opacity-85 group-hover:brightness-125 group-hover:opacity-100"
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
				className="p-2 hover:bg-[#1E2824] text-[#D4CEC8] hover:text-white transition flex items-center gap-2"
				onClick={handleSignOut}
			>
				<img src="/assets/icons/logout.svg" alt="logout" className="h-5 w-5" />
				Logout
			</Button>
		</nav>
	);
};

export default LeftBar;
