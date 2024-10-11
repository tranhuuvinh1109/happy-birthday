import { PropsWithChildren, createContext, useCallback, useContext, useState } from "react";
import { BottomSheetContextType } from "../../type/bottomSheet.type";
import { IoClose } from "react-icons/io5";
const BottomSheetContext = createContext<BottomSheetContextType>({
  isShowBottomSheet: false,
  showBottomSheet: () => {},
  hiddenBottomSheet: () => {},
});

const BottomSheetProvider = ({ children }: PropsWithChildren) => {
  const [isShowBottomSheet, setIsShowBottomSheet] = useState<boolean | null>(null);
  const [intialBottomPortal, setIntialBottomPortal] = useState(false);

  const hiddenBottomSheet = useCallback(() => {
    setIsShowBottomSheet(false);
    setIntialBottomPortal(true);
  }, []);

  const showBottomSheet = useCallback(() => {
    setIsShowBottomSheet(true);
    setIntialBottomPortal(true);
  }, []);

  return (
    <BottomSheetContext.Provider
      value={{
        isShowBottomSheet,
        showBottomSheet,
        hiddenBottomSheet,
      }}
    >
      {children}

      <div
        className={`${!intialBottomPortal ? "top-full hidden" : isShowBottomSheet ? "top-0 animate-sheetShow" : "top-full animate-sheetHidden"} fixed bottom-0 left-0 right-0 z-50 flex flex-col`}
      >
        <div className="flex items-center justify-end p-2 backdrop-blur">
          <button className="p-2 text-white hover:text-gray-600" onClick={hiddenBottomSheet}>
            <IoClose fontSize={20} />
          </button>
        </div>
        <div id="bottom-sheet-content" className="flex-1 overflow-y-auto bg-gray-900" />
      </div>
    </BottomSheetContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBottomSheetContext = () => {
  return useContext(BottomSheetContext);
};

export default BottomSheetProvider;
