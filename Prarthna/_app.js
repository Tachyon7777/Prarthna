import CreateFolderModal from "../components/Folder/CreateFolderModal";
import SideNavbar from "../components/SideNavbar";
import Toast from "../components/Toast";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { ShowToastContext } from "@/context/ShowToastContext";
import { ParentFolderIdContext } from "@/context/ParentFolderIdContext";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [showToastMsg,setShowToastMsg]=useState();
  const [parentFolderId,setParentFolderId]=useState();
    return (
    <SessionProvider session={pageProps.session}>
      <ParentFolderIdContext.Provider value = {{parentFolderId,setParentFolderId}}>
      <ShowToastContext.Provider value={{showToastMsg,setShowToastMsg}}>
      <div className="flex text-ellipsisblack">
        <SideNavbar/>
        <div className="grid grid-cols-1
          md:grid-cols-3 w-full">
          <div className="col-span-2">
            <Component {...pageProps}/>
          </div>
          <div className="bg-white p-5
         order-first md:order-last"
          >
          Storage
          </div>
        </div>
      </div>
      {showToastMsg?<Toast msg={showToastMsg} />:null}
      </ShowToastContext.Provider>
      </ParentFolderIdContext.Provider>
    </SessionProvider>

  );
}

export default MyApp;