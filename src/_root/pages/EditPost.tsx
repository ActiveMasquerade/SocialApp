import { useParams } from "react-router-dom";

import Loader from "@/components/ui/shared/Loader";
import PostForm from "@/components/ui/forms/PostForm";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";

const EditPost = () => {
	const { id } = useParams();
	const { data: post, isLoading } = useGetPostById(id);

	if (isLoading)
		return (
			<div className="flex-center w-full h-full">
				<Loader />
			</div>
		);

	return (
		<div className="flex flex-1">
			<div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
				<div className="max-w-5xl flex gap-3 justify-start w-full">
					<img src="/assets/icons/edit.svg" alt="add" height={36} width={36} />
					<h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] md:font-bold md:leading-[140%] md:tracking-tighter">
						Edit Post
					</h2>
				</div>
				{isLoading ? <Loader /> : <PostForm action="Update" post={post} />}
			</div>
		</div>
	);
};

export default EditPost;
