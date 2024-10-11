import { PropsWithChildren, createContext, useCallback, useContext, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { LoadingContextType } from "../../type/common";
const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  openLoading: () => {},
  closeLoading: () => {},
  setIsLoading: () => {},
});

const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const openLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const closeLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        openLoading,
        closeLoading,
        setIsLoading,
      }}
    >
      {children}
      {isLoading && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-[1000000000] bg-overlay80">
          <div className="flex h-full w-full items-center justify-center ">
            <AiOutlineLoading3Quarters className="animate-spin" fill="#ffffff" fontSize={60} />
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLoadingContext = () => {
  return useContext(LoadingContext);
};

export default LoadingProvider;
