import { Dispatch, SetStateAction } from "react";

export type UserType = {
  id: number;
  email: string;
  username: string;
  type: number;
  avatar: string;
};

export type ContainerProps = {
  children: JSX.Element;
  className?: string;
};

export type LoadingContextType = {
  isLoading: boolean;
  openLoading: () => void;
  closeLoading: () => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};
