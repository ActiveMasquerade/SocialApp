import { toast } from "sonner";
import Loader from "@/components/ui/shared/Loader";
import UserCard from "@/components/ui/shared/UserCard";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";

const AllUsers = () => {
	const { data: creators, isLoading, isError: isErrorCreators } = useGetUsers();

	if (isErrorCreators) {
		toast.error("Something went wrong");

		return;
	}

	return (
		<div className="flex flex-col flex-1 items-center gap-10 overflow-y-auto py-10 px-5 md:px-8 lg:p-14">
			<div className="max-w-5xl w-full flex flex-col items-start gap-6 md:gap-9">
				<h2 className="text-2xl md:text-3xl font-bold text-left w-full">All Users</h2>

				{isLoading && !creators ? (
					<Loader />
				) : (
					<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
						{creators?.documents.map((creator) => (
							<li key={creator?.$id} className="w-full">
								<UserCard user={creator} />
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default AllUsers;
