import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import FileList from '@/components/File/FileList';
import { ShowToastContext } from '@/context/ShowToastContext';
import { ParentFolderIdContext } from '@/context/ParentFolderIdContext';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '@/Config/FirebaseConfig';
import Head from 'next/head';
import Image from 'next/image';
import Searchbar from '@/components/Searchbar';
import FolderList from '@/components/Folder/FolderList';

export default function Home() {
    const { data: session } = useSession();
    const router = useRouter();
    const [folderList, setFolderList] = useState([]);
    const [fileList, setFileList] = useState([]);
    const db = getFirestore(app);
    const { parentFolderId, setParentFolderId } = useContext(ParentFolderIdContext);
    const { showToastMsg, setShowToastMsg } = useContext(ShowToastContext);
    
    useEffect(() => {
        console.log("User Session", session);
        if (!session) {
            router.push("/login");
        } else {
            setFolderList([]);
            getFolderList();
            getFileList();

            console.log("User Session", session.user);
        }
        setParentFolderId(0);
    }, [session, showToastMsg]);

    const getFolderList = async () => {
        setFolderList([]);
        const q = query(collection(db, "Folders"),
            where("parentFolderId", '==', 0),
            where("createBy", '==', session.user.email));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            setFolderList(folderList => ([...folderList, doc.data()]));
        });
    };

    const getFileList = async () => {
        setFileList([]);
        const q = query(collection(db, "files"),
            where("parentFolderId", '==', 0),
            where("createdBy", '==', session.user.email));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setFileList(fileList => ([...fileList, doc.data()]));
        });
    };

    return (
        <div className='p-5'>
            <Searchbar />
            <FolderList folderList={folderList} />
            <FileList fileList={fileList} />
        </div>
    );
}
