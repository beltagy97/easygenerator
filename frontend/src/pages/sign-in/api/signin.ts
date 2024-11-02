import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/fetcher/axios";
import { SignInForm } from "..";
import { AuthResponseType } from "../../../shared/types";

export const useSignIn = () => {
    const { mutateAsync, data, error, isPending } = useMutation({
        mutationFn: async ({email, password}: SignInForm) => {
            return (await axiosClient.post<AuthResponseType>(`/auth/signin`,{email, password})).data;
        },
    });
    return { mutateAsync, data, error, isPending };
};

