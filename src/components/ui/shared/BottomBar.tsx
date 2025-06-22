import { bottombarLinks } from "@/constants";
import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
	const { pathname } = useLocation();
	return (
		<section className="z-50 flex justify-between items-center w-full sticky bottom-0 rounded-t-2xl bg-[#120912] px-5 py-4 md:hidden border-t border-[#1A1A1A] shadow-[0_-1px_2px_rgba(0,0,0,0.5)]">
			{bottombarLinks.map((link) => {
				const isActive = pathname === link.route;

				return (
					<Link
						key={`bottombar-${link.label}`}
						to={link.route}
						className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition ${
							isActive ? "bg-[#1E2824]" : "hover:bg-[#151C1A]"
						}`}
					>
						<img
							src={link.imgURL}
							alt={link.label}
							width={16}
							height={16}
							className={`transition ${
								isActive
									? "invert brightness-[2.2]"
									: "opacity-70 group-hover:opacity-100"
							}`}
						/>

						<p
							className={`text-[10px] font-medium leading-[140%] ${
								isActive ? "text-[#FAFAF5]" : "text-[#8C7C73]"
							}`}
						>
							{link.label}
						</p>
					</Link>
				);
			})}
		</section>
	);
};

export default BottomBar;
