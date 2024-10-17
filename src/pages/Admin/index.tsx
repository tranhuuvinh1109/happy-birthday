import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db, setDataToFirebase, uploadImageToFirebase } from "../../provider/Firebase";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaTimes } from "react-icons/fa";
import bg from "../../assets/images/iphone1.png";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [isShowForm, setIsShowForm] = useState(false);
  const [file, setFile] = useState<File | undefined>();
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const toggleBtn = () => {
    setDataToFirebase("isShowForm", !isShowForm);
  };

  const simulateProgress = (callback: () => void) => {
    let simulatedProgress = 0;
    const interval = setInterval(() => {
      if (simulatedProgress >= 90) {
        clearInterval(interval);
        callback();
      } else {
        simulatedProgress += Math.random() * 10;
        setProgress(Math.min(90, simulatedProgress));
      }
    }, 200);
  };

  const handleClearFile = () => {
    setFile(undefined);
    setPreviewURL(null);
  };

  const handleUploadFile = async () => {
    if (!file) {
      return;
    }
    setIsLoading(true);
    setProgress(0);
    simulateProgress(async () => {
      const res = await uploadImageToFirebase(file, "mylove");
      if (res) {
        setProgress(100);
        handleClearFile();
        toast.success(`Upload ${file.name} successfully`);
      } else {
        toast.error(`Upload ${file.name} failed`);
      }
      setIsLoading(false);
    });
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      const fileType = selectedFile.type;

      if (fileType.startsWith("image/")) {
        setFile(selectedFile);
        setPreviewURL(URL.createObjectURL(selectedFile));
      } else {
        setFile(undefined);
        setPreviewURL(null);
        console.log("Invalid file type. Please upload an image.");
      }
    }
  };

  useEffect(() => {
    const dbRef = ref(db, "data/isShowForm");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setIsShowForm(snapshot.val());
      } else {
        console.log("No data available");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <div className="fixed left-0 top-0">
        <div className="ml-6 mt-6 rounded-full bg-slate-300 p-1">
          <Link to={"/"}>
            <IoMdArrowRoundBack fontSize={18} />
          </Link>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <div className="relative w-fit">
          <img src={bg} alt="bg" className="max-w-[300px]" />
          <div className="absolute left-[50%] top-[50%] w-[240px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg">
            {!file && !previewURL && (
              <div className="flex justify-center">
                <label
                  htmlFor="image"
                  className="flex w-fit items-center gap-2 rounded-md border border-gray-700 px-6 py-2 font-semibold hover:opacity-60"
                >
                  <FaCloudUploadAlt fontSize={26} /> Upload File
                </label>
                <input type="file" id="image" onChange={handleFileChange} className="hidden" accept="image/*" />
              </div>
            )}
            {previewURL && <img src={previewURL} alt="Preview" className="object-cover" />}
          </div>
          {file && (
            <>
              <div className="absolute right-8 top-12 z-10">
                <button className="rounded-full bg-slate-100 p-2" onClick={handleClearFile}>
                  <FaTimes fontSize={14} />
                </button>
              </div>
              <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center">
                <button
                  className="rounded-lg bg-orange-400 px-10 py-1.5 font-semibold text-white"
                  onClick={handleUploadFile}
                >
                  Upload
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-10 flex items-center justify-center gap-6">
        <h1>Status: {isShowForm ? "true" : "false"}</h1>
        <button onClick={toggleBtn} className="rounded-lg bg-orange-400 px-4 py-2 font-semibold text-white">
          {isShowForm ? "Active" : "Deactive"}
        </button>
      </div>
      {isLoading && <Loading progress={progress} />}
    </div>
  );
};

export default AdminPage;
