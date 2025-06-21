import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
	const { pathname } = useLocation();
	return (
		<section className="z-50 flex justify-between items-center w-full sticky bottom-0 rounded-t-[20px] bg-[#09090A] px-5 py-4 md:hidden">
			{bottombarLinks.map((link) => {
				const isActive = pathname === link.route;
				return (
					<Link
						key={`bottombar-${link.label}`}
						to={link.route}
						className={`text-center ${
							isActive && " bg-[#214353]"
						}  flex items-center justify-center flex-col gap-1 p-2 transition rounded-xl`}
					>
						<img
							src={link.imgURL}
							alt={link.label}
							width={16}
							height={16}
							className={`${isActive && "invert brightness-0 transition"}`}
						/>

						<p className="text-[10px] font-medium leading-[140%] text-[#EFEFEF]">
							{link.label}
						</p>
					</Link>
				);
			})}
		</section>
	);
};

export default BottomBar;
