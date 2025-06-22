import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";

import GridPostList from "@/components/ui/shared/GridPostList";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/ui/shared/Loader";

export type SearchResultProps = {
	isSearchFetching: boolean;
	searchedPosts: any;
};

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
	if (isSearchFetching) {
		return <Loader />;
	} else if (searchedPosts && searchedPosts.documents.length > 0) {
		return <GridPostList posts={searchedPosts.documents} />;
	} else {
		return <p className="text-light-4 mt-10 text-center w-full">No results found</p>;
	}
};

const Explore = () => {
	const { ref, inView } = useInView();
	const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

	const [searchValue, setSearchValue] = useState("");
	const debouncedSearch = useDebounce(searchValue, 500);
	const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedSearch);

	useEffect(() => {
		if (inView && !searchValue) {
			fetchNextPage();
		}
	}, [inView, searchValue]);

	if (!posts)
		return (
			<div className="flex-center w-full h-full">
				<Loader />
			</div>
		);

	const shouldShowSearchResults = searchValue !== "";
	const shouldShowPosts =
		!shouldShowSearchResults && posts.pages.every((item) => item.documents.length === 0);

	return (
		<div className="flex flex-col flex-1 items-center overflow-scroll py-10 px-5 md:p-14">
			<div className="max-w-5xl flex flex-col items-center w-full gap-6 md:gap-9">
				<h2 className="text-2xl md:text-3xl font-bold">Search Posts</h2>

				<div className="flex items-center gap-2 w-full bg-stone-800 border border-stone-700 rounded-lg px-4 py-2">
					<img src="/assets/icons/search.svg" alt="search" className="w-5 h-5" />
					<Input
						type="text"
						placeholder="Search"
						className="w-full bg-transparent outline-none text-stone-200 placeholder-stone-500"
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
				</div>
			</div>

			<div className="w-full max-w-5xl mt-16 mb-7 flex justify-between items-center">
				<h3 className="text-xl font-semibold">Popular Today</h3>

				<div className="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 px-4 py-2 rounded-lg cursor-pointer">
					<p className="text-sm md:text-base text-stone-300">All</p>
					<img src="/assets/icons/filter.svg" alt="filter" className="w-5 h-5" />
				</div>
			</div>

			{/* Posts Area */}
			<div className="w-full max-w-5xl flex flex-wrap gap-6 justify-start">
				{shouldShowSearchResults ? (
					<SearchResults
						isSearchFetching={isSearchFetching}
						searchedPosts={searchedPosts}
					/>
				) : shouldShowPosts ? (
					<p className="text-stone-500 mt-10 text-center w-full">End of posts</p>
				) : (
					posts.pages.map((item, index) => (
						<GridPostList key={`page-${index}`} posts={item.documents} />
					))
				)}
			</div>

			{hasNextPage && !searchValue && (
				<div ref={ref} className="mt-10">
					<Loader />
				</div>
			)}
		</div>
	);
};

export default Explore;
