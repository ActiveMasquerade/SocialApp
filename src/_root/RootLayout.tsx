import { Outlet } from "react-router-dom";
import TopBar from "@/components/ui/shared/Topbar";
import LeftBar from "@/components/ui/shared/LeftBar";
import BottomBar from "@/components/ui/shared/BottomBar";
const RootLayout = () => {
	return (
		<div className="w-full md:flex">
			<TopBar />
			<LeftBar />

			<section className="flex flex-1 h-full">
				<Outlet />
			</section>

			<BottomBar />
		</div>
	);
};

export default RootLayout;
