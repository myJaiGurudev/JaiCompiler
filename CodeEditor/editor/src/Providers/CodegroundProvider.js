import {createContext, useContext, useEffect, useState} from "react";
import {v4} from 'uuid'

export const CodegroundContext = createContext();

const initialData = [
    {
        id: v4(),
        title: 'DSA',
        files: [
            {
                id: v4(),
                title: 'index',
                code: `
//Hey! Do some coding and enjoy!
#include <iostream>
using namespace std;
int main()
{
    cout<<"Hello World";
    return 0;
}
`,
                language: "cpp"
            }
        ]
    },
    {
        id: v4(),
        title: 'Competitive Programming',
        files: [
            {
                id: v4(),
                title: 'codeFile',
                code: `
//Hey! Do some coding and enjoy!

console.log("Hello World");
`,
                language: "javascript"
            }
        ]
    }
];

const initialTheme = "vs-dark";

export const defaultCode = {
    'cpp': `
//Hey! Do some coding and enjoy.

#include <iostream>

using namespace std;

int main()
{
    cout<<"Hello World";
    return 0;
}
`,
    'javascript': `
//Hey! Do some coding and enjoy!

console.log("Hello World");
`,
    'python': `
#Hey! Do some coding and enjoy!

print("Hello World")
`,
    'java': `
//Hey! Do some coding and enjoy!

class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
`
}

export const  CodegroundProvider = ({children}) => {

    const [folders, setFolders]= useState(() => {
        const localData= localStorage.getItem('data')
        if(localData){
            return JSON.parse(localData);
        }
        return initialData;
    });
    
    const createNewCodeground = (newCodeground) => {
        const {fileName, folderName, language} = newCodeground;
        const newFolders = [...folders];
        newFolders.push({
            id: v4(),
            title: folderName,
            files: [
                {
                    id: v4(),
                    title: fileName,
                    code: defaultCode[language],
                    language
                }
            ]
        })
        localStorage.setItem('data', JSON.stringify(newFolders));
        setFolders(newFolders);
    }

    const createNewFolder = (folderName) => {
        const newFolder= {
            id: v4(),
            title: folderName,
            files: []
        }
        const allFolders= [...folders,newFolder];
        localStorage.setItem('data', JSON.stringify(allFolders));
        setFolders(allFolders);
    }

    const deleteFolder = (id) => {
        const updateFolders= folders.filter((folderItem) => {
            return folderItem.id!==id;
        })
        localStorage.setItem('data',JSON.stringify(updateFolders));
        setFolders(updateFolders);
    }

    const editFolderTitle = (newFolderName,id) => {
        const updateFolders= folders.map((folderItem) => {
            if(folderItem.id===id){
                folderItem.title=newFolderName;
            }
            return folderItem;
        })
        localStorage.setItem('data',JSON.stringify(updateFolders));
        setFolders(updateFolders);
    }
    
    const editFileTitle = (newFileName, folderId, fileId) => {
        const copyFolders = [...folders];
        for (let i = 0; i < copyFolders.length; i++) {
            if (copyFolders[i].id === folderId) {
                const files = copyFolders[i].files;
                for (let j = 0; j < files.length; j++) {
                    if (files[j].id === fileId) {
                        files[j].title = newFileName;
                        break;
                    }
                }
                break;
            }
        }
        localStorage.setItem('data', JSON.stringify(copyFolders));
        setFolders(copyFolders);
    };

    const editLanguage = (newLanguage, folderId, fileId) => {
        const copyFolders = [...folders];
        for (let i = 0; i < copyFolders.length; i++) {
            if (copyFolders[i].id === folderId) {
                const files = copyFolders[i].files;
                for (let j = 0; j < files.length; j++) {
                    if (files[j].id === fileId) {
                        files[j].language = newLanguage;
                        files[j].code = defaultCode[newLanguage];
                        break;
                    }
                }
                break;
            }
        }
        localStorage.setItem('data', JSON.stringify(copyFolders));
        setFolders(copyFolders);
    };

    const deleteFile = (folderId, fileId) => {
        const copyFolders= [...folders];
        for(let i=0;i<copyFolders.length;i++){
            if(copyFolders[i].id===folderId){
                const files=copyFolders[i].files;
                copyFolders[i].files = files.filter((file) => {
                    return file.id!==fileId;
                })
                break;
            }
        }
        localStorage.setItem('data', JSON.stringify(copyFolders));
        setFolders(copyFolders);
    }

    const createCodeground = (folderId, file) => {
        const copyFolders= [...folders];
        for(let i=0;i<copyFolders.length;i++){
            if(copyFolders[i].id===folderId){
                copyFolders[i].files.push(file);
                break;
            }
        }
        localStorage.setItem('data', JSON.stringify(copyFolders));
        setFolders(copyFolders);
    }

    const getDefaultCode = (fileId, folderId) => {
        for(let i=0;i<folders.length;i++){
            if(folders[i].id===folderId){
                for(let j=0;j<folders[i].files.length;j++){
                    const cur=folders[i].files[j];
                    if(cur.id===fileId){
                        return cur.code;
                    }
                }
            }
        }
    }

    const getLanguage = (fileId, folderId) => {
        for(let i=0;i<folders.length;i++){
            if(folders[i].id===folderId){
                for(let j=0;j<folders[i].files.length;j++){
                    const cur=folders[i].files[j];
                    if(cur.id===fileId){
                        return cur.language;
                    }
                }
            }
        }
    }

    const saveCode = (fileId, folderId, newCode) => {
        const copyFolders = [...folders];
        for (let i = 0; i < copyFolders.length; i++) {
            if (copyFolders[i].id === folderId) {
                const files = copyFolders[i].files;
                for (let j = 0; j < files.length; j++) {
                    if (files[j].id === fileId) {
                        files[j].code = newCode;
                        break;
                    }
                }
                break;
            }
        }
        localStorage.setItem('data', JSON.stringify(copyFolders));
        setFolders(copyFolders);
    }

    useEffect(() => {
        if(!localStorage.getItem['data']){
            localStorage.setItem('data', JSON.stringify(folders));
        }
    }, [])

    const codegroundFeatures = {
        folders,
        createNewCodeground,
        createNewFolder,
        deleteFolder,
        editFolderTitle,
        editFileTitle,
        deleteFile,
        createCodeground,
        getDefaultCode,
        getLanguage,
        editLanguage,
        saveCode
    }
    return (
        <CodegroundContext.Provider value={codegroundFeatures}>
            {children}
        </CodegroundContext.Provider>
    );
}