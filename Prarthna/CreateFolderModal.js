import { useSession } from "next-auth/react";
import { app } from "@/Config/FirebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { ShowToastContext } from "@/context/ShowToastContext";
import { ParentFolderIdContext } from "@/context/ParentFolderIdContext";

function CreateFolderModal() {
  const context = useContext(ParentFolderIdContext);
  const parentFolderId = context?.parentFolderId ?? null; // Default to null if undefined
  const docId = Date.now().toString();
  const { data: session } = useSession();
  const [folderName, setFolderName] = useState("");
  const {showToastMsg,setShowToastMsg}=useContext(ShowToastContext)
  const db = getFirestore(app);

  const onCreate = async () => {
    if (!folderName.trim()) {
      alert("Folder name cannot be empty.");
      return;
    }

    try {
      const folderData = {
        name: folderName,
        id: docId,
        createBy: session?.user?.email || "Anonymous",
        parentFolderId, // Always valid (null if undefined)
      };

      await setDoc(doc(db, "Folders", docId), folderData);
      setShowToastMsg('Folder Created!')
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  return (
    <div>
      <form method="dialog" className="modal-box p-9 items-center">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <div className="w-full items-center flex flex-col justify-center gap-3">
          <Image src="/folder.png" alt="folder" width={50} height={50} />
          <input
            type="text"
            placeholder="Folder Name"
            className="p-2 border-[1px] outline-none rounded-md"
            onChange={(e) => setFolderName(e.target.value)}
            value={folderName}
          />
          <button
            type="button"
            className="bg-blue-500 text-white rounded-md p-2 px-3 w-full"
            onClick={onCreate}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateFolderModal;
