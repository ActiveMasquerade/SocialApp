import PostForm from "@/components/ui/forms/PostForm";

const CreatePost = () => {
	return (
		<div className="flex flex-1 ">
			<div className="flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
				<div className="max-w-5xl flex gap-3 justify-start w-full">
					<img src="/public/assets/icons/add-post.svg" alt="add" height={36} width={36} />
					<h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] md:font-bold md:leading-[140%] md:tracking-tighter">
						Create Post
					</h2>
				</div>
				<PostForm action="Create" />
			</div>
		</div>
	);
};

export default CreatePost;
