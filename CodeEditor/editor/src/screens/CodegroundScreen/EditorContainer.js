import { useContext, useRef, useState } from "react"
import "./EditorContainer.scss"
import Editor from "@monaco-editor/react"
import { CodegroundContext } from "../../Providers/CodegroundProvider"
import { useTheme } from "../../Providers/ThemeProvider"

const editorOptions = {
    fontSize: 16,
    wordWrap: 'on'
}

const fileExtensionMapping = {
    cpp: 'cpp',
    javascript: 'js',
    python: 'py',
    java: 'java'
}

export const EditorContainer = ({fileId, folderId}) => {

    const {getDefaultCode, getLanguage, editLanuage, saveCode} = useContext(CodegroundContext);

    const [isFullScreen, setIsFullScreen] = useState(false);

    const [showLoader, setShowLoader] = useState(false);

    const [code, setCode] = useState(() => {
        return getDefaultCode(fileId, folderId);
    });

    const  [language, setLanguage] = useState(() => {
        return getLanguage(fileId, folderId);
    });

    const {theme, setTheme} =useTheme();


    const codeRef = useRef();

    const onChangeCode = (newCode) => {
        codeRef.current=newCode;
    }

    const onSaveCode = () => {
        saveCode(fileId, folderId, codeRef.current);
        alert("Code Saved Successfully!");
    }

    const importCode = (e) => {
        const file = e.target.files[0];
        const fileType = file.type.includes("text");
        if(fileType) {
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = function(value) {
                const importCode = value.target.result;
                setCode(importCode);
                codeRef.current= importCode;
            }
        }
        else {
            alert("Please select a program file!");
        }
    }

    const exportCode = (e) => {
        const codeValue= codeRef.current?.trim();
        if(!codeValue) {
            alert("Kindly enter code in the editor before exporting!");
            return;
        }

        const codeBlob = new Blob([codeValue], {type: "text/plain"});

        const downloadUrl= URL.createObjectURL(codeBlob);
        const link = document.createElement("a");
        link.href= downloadUrl;
        link.download= `code.${fileExtensionMapping[language]}`;
        link.click();
    }

    const onChangeLanguage = (e) => {
        setLanguage(e.target.value);
        editLanuage(e.target.value, folderId, fileId);
        const l=getDefaultCode(fileId,folderId);
        setCode(l);
        codeRef.current=l;
    }

    const onToggleTheme = () => {
        setTheme(prevTheme => (prevTheme === "vs-dark" ? "vs-light" : "vs-dark"));
    };

    const fullScreen = () => {
        setIsFullScreen(!isFullScreen);
    }

    return (
        <div className="root-editor-container" style={isFullScreen ? styles.fullScreen : { height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className={`editor-header ${theme}`}>
                <div className={`editor-left-container ${theme}`}>
                    <strong>{"Title of the Card"}</strong>
                    <div className={`btn ${theme}`}>
                        <span className="material-icons">edit</span>
                        <div class={`custom-tooltip ${theme}`}>Edit Title</div>
                    </div>
                </div>
                <div className="editor-right-container">
                    <button className={`btn ${theme}`} role="button" onClick={onSaveCode}>
                        <span className="material-icons">save</span>
                        <div class={`custom-tooltip ${theme}`}>Save Code</div>
                    </button>
                    <button onClick={onToggleTheme} value={theme} className={`btn ${theme}`}>
                        {theme === "vs-dark" ? (
                            <>
                                <span className="material-icons">dark_mode</span>
                                <div class={`custom-tooltip ${theme}`}>Light Mode</div>
                            </>
                        ) : (
                            <>
                                <span className="material-icons">light_mode</span>
                                <div class={`custom-tooltip ${theme}`}>Dark Mode</div>
                            </>
                        )}
                    </button>
                    <button className={`btn ${theme}`} onClick={fullScreen}>
                        <span className="material-icons">{isFullScreen ? "fullscreen_exit" : "fullscreen"}</span>
                        <div class={`custom-tooltip ${theme}`}>{isFullScreen ? "Minimize" : "Maximize"}</div>
                    </button>
                    <label htmlFor="import-code" className={`btn ${theme}`}>
                        <span className="material-icons">cloud_download</span>
                        <div class={`custom-tooltip ${theme}`}>Import Code</div>
                    </label>
                    <input type="file" id="import-code" style={{display: 'none'}} onChange={importCode} />
                    <button className={`btn ${theme}`} onClick={exportCode}>
                        <span className="material-icons">cloud_upload</span>
                        <div class={`custom-tooltip ${theme}`}>Export Code</div>
                    </button>
                    <select onChange={onChangeLanguage} value={language}>
                        <option value="cpp">C++</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="javascript">JavaScript</option>
                    </select>
                    <button className={`button-33 ${theme}`}>
                        <span className="material-icons">play_arrow</span>
                        <span>&nbsp;𝙍𝙪𝙣&nbsp;&nbsp;</span>
                    </button>
                </div>
            </div>
            <div className="editor-body">
                <Editor 
                    height={"100%"}
                    language={language}
                    options={editorOptions}
                    theme={theme}
                    onChange={onChangeCode}
                    value={code}
                />
            </div>
            {showLoader && <div className="fullpage-loader">
                <div className="loader">

                </div>
            </div>}
        </div>
    );
}

const styles = {
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10
    }
}
