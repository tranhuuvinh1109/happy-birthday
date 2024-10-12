import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useCallback, useMemo, useState } from "react";
import { addDataToFirebase } from "../../provider/Firebase";
import { AnswerType } from "../../type/common";
import toast from "react-hot-toast";

type ConfirmProps = {
  onClick: () => void;
};

export default function Confirm({ onClick }: ConfirmProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isSwapped, setIsSwapped] = useState(false);
  const [step, setStep] = useState(1);

  const [data, setData] = useState<AnswerType>({
    feedback: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSwap = useCallback(() => {
    setIsSwapped((pre) => !pre);
  }, []);

  const handleNextStep = useCallback(() => {
    setStep((pre) => pre + 1);
  }, []);

  const handleSend = useCallback(
    (name: "feedback" | "name") => {
      if (data[name].length > 5) {
        addDataToFirebase(`love/${name}`, { value: data[name], create_at: new Date().getTime() });
        toast.success("Save answer successfully");
        if (name === "name") {
          setIsOpen(false);
          return;
        }
        setStep((pre) => pre + 1);
        return;
      }
      toast.error("Please enter a value with a length greater than 5.");
    },
    [data]
  );

  const renderUI = useMemo(() => {
    if (step === 1) {
      return (
        <>
          <div className="py-4">
            <h5 className="text-xl font-semibold">Are you currently happy with someone pursuing you?</h5>
          </div>
          <div className="mt-4 ">
            <div className=" flex gap-4">
              {isSwapped ? (
                <>
                  <Button
                    onClick={handleNextStep}
                    className=" flex flex-1 items-center justify-center gap-2 rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600  data-[focus]:outline-1 data-[focus]:outline-white"
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={handleSwap}
                    className=" flex flex-1 items-center justify-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600  data-[focus]:outline-1 data-[focus]:outline-white"
                  >
                    No
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      handleSwap();
                      onClick();
                    }}
                    className=" flex flex-1 items-center justify-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600  data-[focus]:outline-1 data-[focus]:outline-white"
                  >
                    No
                  </Button>
                  <Button
                    onClick={() => {
                      handleNextStep();
                      onClick();
                    }}
                    className=" flex flex-1 items-center justify-center gap-2 rounded-md bg-red-500  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600  data-[focus]:outline-1 data-[focus]:outline-white"
                  >
                    Yes
                  </Button>
                </>
              )}
            </div>
          </div>
        </>
      );
    }
    if (step === 2) {
      return (
        <div className="mt-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold sm:text-base" htmlFor="feedback">
              How do you feel about the person who is pursuing you?
            </label>
            <textarea
              rows={4}
              id="feedback"
              name="feedback"
              value={data.feedback}
              onChange={handleChange}
              placeholder="Enter your answer here ..."
              className="rounded-lg border border-gray-500 px-4 py-2 text-base"
            />
            <h6 className=" text-xs text-red-500">
              Note: The answer you enter will not be sent, it is only stored on your device
            </h6>
          </div>
          <div className="mt-4 flex">
            <div className="flex-1"></div>
            <Button
              onClick={() => handleSend("feedback")}
              className=" flex flex-1 items-center justify-center gap-2 rounded-md bg-red-500  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600  data-[focus]:outline-1 data-[focus]:outline-white"
            >
              Save
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="mt-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold sm:text-base" htmlFor="name">
            Nickname of the person who is pursuing you
          </label>
          <input
            value={data.name}
            onChange={handleChange}
            id="name"
            name="name"
            className=" rounded-md border border-gray-500 px-4 py-2 "
            placeholder="Enter the nickname ..."
          />
          <h6 className=" text-xs text-red-500">
            Note: The answer you enter will not be sent, it is only stored on your device
          </h6>
        </div>
        <div className="mt-4 flex">
          <div className="flex-1"></div>
          <Button
            onClick={() => handleSend("name")}
            className=" flex flex-1 items-center justify-center gap-2 rounded-md bg-red-500  px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600  data-[focus]:outline-1 data-[focus]:outline-white"
          >
            Done
          </Button>
        </div>
      </div>
    );
  }, [data, handleNextStep, handleSend, handleSwap, isSwapped, onClick, step]);

  return (
    <Dialog open={isOpen} as="div" className="relative z-[2] focus:outline-none" onClose={() => {}}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center bg-overlay60 p-4 font-mono">
          <DialogPanel
            // transition
            className="data-[closed]:transform-[scale(95%)] w-full max-w-[350px] rounded-xl bg-white  p-6 text-black backdrop-blur-2xl duration-500 ease-out data-[closed]:opacity-0 sm:max-w-[500px]"
          >
            <DialogTitle as="h3" className="text-2xl font-medium text-black">
              Verify
            </DialogTitle>
            {renderUI}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
