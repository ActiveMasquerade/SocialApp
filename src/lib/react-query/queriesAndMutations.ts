import { useMutation, useInfiniteQuery, useQueryClient, useQuery } from "@tanstack/react-query";
import {
	createPost,
	createUserAccount,
	deleteSavedPost,
	getCurrentUser,
	getRecentPosts,
	getUsers,
	likePost,
	savePost,
	signinAccount,
	updatePost,
} from "../appwrite/api";
import type { INewPost, INewUser, IUpdatePost } from "@/types";
import { QUERY_KEYS } from "@/lib/react-query/queryKeys";
import { signoutAccount } from "../appwrite/api";
export const useCreateUserAccount = () => {
	return useMutation({
		mutationFn: (user: INewUser) => createUserAccount(user),
	});
};
export const useSigninAccount = () => {
	return useMutation({
		mutationFn: (user: { email: string; password: string }) => {
			return signinAccount(user);
		},
	});
};
export const useSignoutAccount = () => {
	return useMutation({
		mutationFn: () => {
			return signoutAccount();
		},
	});
};
export const useCreatePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (post: INewPost) => createPost(post),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
		},
	});
};
export const useUpdatePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (post: IUpdatePost) => updatePost(post),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
			});
		},
	});
};
export const useGetRecentPosts = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
		queryFn: getRecentPosts,
	});
};
export const useGetUsers = (limit?: number) => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_USERS],
		queryFn: () => getUsers(limit),
	});
};
export const useLikePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ postId, likesArray }: { postId: string; likesArray: string[] }) =>
			likePost(postId, likesArray),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			});
		},
	});
};

export const useSavePost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
			savePost(userId, postId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			});
		},
	});
};

export const useDeleteSavedPost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_POSTS],
			});
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_CURRENT_USER],
			});
		},
	});
};

export const useGetCurrentUser = () => {
	return useQuery({
		queryKey: [QUERY_KEYS.GET_CURRENT_USER],
		queryFn: getCurrentUser,
	});
};
