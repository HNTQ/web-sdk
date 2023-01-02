import React from "react";
import { useIdentity } from "../../contexts/user";

export interface ISignedInProps {
    children: React.ReactNode;
}

export const SignedOut = ({
    children,
}: ISignedInProps) => {
    const { user } = useIdentity();
    return (
        !user ? <>{children}</> : <></>
    )
}