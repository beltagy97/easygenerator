import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "../../../shared/fetcher/axios";
import { SignUpForm } from "..";
import { AuthResponseType } from "../../../shared/types";

export const useSignUp = () => {
    const { mutateAsync, data, error, isPending } = useMutation({
        mutationFn: async ({email, name, password}: SignUpForm) => {
            return (await axiosClient.post<AuthResponseType>(`/auth/signup`,{email, name, password})).data;
        },
    });
    return { mutateAsync, data, error, isPending };
};

