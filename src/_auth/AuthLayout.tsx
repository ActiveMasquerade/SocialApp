import { useUserContext } from "@/Context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
const AuthLayout = () => {
	const { isAuthenticated } = useUserContext();
	return (
		<>
			{isAuthenticated ? (
				<Navigate to="/"></Navigate>
			) : (
				<>
					<section className="flex flex-1 justify-center flex-col py-10 items-center">
						<Outlet />
					</section>
					<img
						src="/public/assets/images/side-img.svg"
						alt="logo"
						className="hidden lg:block h-screen object-cover bg-no-repeat w-1/2"
					/>
				</>
			)}
		</>
	);
};

export default AuthLayout;
