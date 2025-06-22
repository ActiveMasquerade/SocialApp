import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import { Toaster } from "@/components/ui/sonner";
import SignupForm from "./_auth/pages/SignupForm";
import SigninForm from "./_auth/pages/SigninForm";
import RootLayout from "./_root/RootLayout";
import {
	Home,
	CreatePost,
	UpdateProfile,
	Saved,
	AllUsers,
	Explore,
	EditPost,
	PostDetails,
	Profile,
} from "./_root/pages";
function App() {
	return (
		<>
			<main className="flex h-screen">
				<Routes>
					<Route element={<AuthLayout />}>
						<Route path="/sign-up" element={<SignupForm />}></Route>
						<Route path="/sign-in" element={<SigninForm />}></Route>
					</Route>
					<Route element={<RootLayout />}>
						<Route index element={<Home />}></Route>
						<Route path="/explore" element={<Explore />} />
						<Route path="/saved" element={<Saved />} />
						<Route path="/all-users" element={<AllUsers />} />
						<Route path="/create-post" element={<CreatePost />} />
						<Route path="/update-post/:id" element={<EditPost />} />
						<Route path="/posts/:id" element={<PostDetails />} />
						<Route path="/profile/:id/*" element={<Profile />} />
						<Route path="/update-profile/:id" element={<UpdateProfile />} />
					</Route>
				</Routes>
			</main>
			<Toaster position="top-right" />
		</>
	);
}

export default App;
