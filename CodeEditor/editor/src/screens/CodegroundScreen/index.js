import { useParams } from "react-router-dom"
import "./index.scss"
import { EditorContainer } from "./EditorContainer";
import { useEffect, useState } from "react";
import { useTheme } from "../../Providers/ThemeProvider";

export const  CodegroundScreen= () => {

    const param = useParams();
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const {fileId, folderId} = param;
    const [isFullScreenInput, setIsFullScreenInput] = useState(false);
    const [isFullScreenOutput, setIsFullScreenOutput] = useState(false);
    const {theme} =useTheme();

    const importInput = (e) => {
        const file=e.target.files[0];
        const fileType = file.type.includes("text");
        if(fileType) {
            const fileReader= new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = (e) => {
                setInput(e.target.result);
            };
        }
        else {
            alert("Please select a program file!");
        }
    }
    
    const exportOutput = (e) => {
        const outputValue= output.trim();
        if(!outputValue){
            alert("Output is Empty!");
            return;
        }
        const codeBlob = new Blob([outputValue], {type: "text/plain"});

        const downloadUrl= URL.createObjectURL(codeBlob);
        const link = document.createElement("a");
        link.href= downloadUrl;
        link.download= `output.txt`;
        link.click();
    }

    const fullScreenOutput = () => {
        setIsFullScreenOutput(!isFullScreenOutput);
    }

    const fullScreenInput = () => {
        setIsFullScreenInput(!isFullScreenInput);
    }
    useEffect(() => {
        const container = document.getElementById('name-container');
        if (!container) return; // Prevent null errors

        function animateName() {
            const name = 'JaiCompiler'.split('');
            container.innerHTML = '';
            name.forEach((char, index) => {
                const letterSpan = document.createElement('span');
                if (char === ' ') {
                    letterSpan.classList.add('space');
                } else {
                    letterSpan.textContent = char;
                    letterSpan.classList.add('letter');
                    letterSpan.style.animationDelay = `${index * 0.2}s`;
                }
                container.appendChild(letterSpan);
            });
        }

        animateName();
        const intervalId = setInterval(animateName, 5000);

        return () => clearInterval(intervalId); 
    }, []);

    return <div className="codeground-container">
        <div className={`header-container ${theme}`}>
            <img src="/logo2.png" className="logo"/>
            <div id="name-container"></div>
        </div>
        <div className={`content-container ${theme}`}>
            <div className="editor-container">
                <EditorContainer fileId={fileId} folderId={folderId} />
            </div>
            <div className={`container ${theme}`} style={isFullScreenInput ? styles.fullScreen: {}}>
                <div className={`header ${theme}`}>
                    <strong>𝙄𝙣𝙥𝙪𝙩 :</strong>
                    <div className="IOM">
                        <label htmlFor="input" className={`btn ${theme}`}>
                            <span className="material-icons">cloud_download</span>
                            <div class={`custom-tooltip ${theme}`}>Import Input</div>
                        </label>
                        <button className={`btn ${theme}`} onClick={fullScreenInput}>
                            <span className="material-icons">{isFullScreenInput ? "fullscreen_exit" : "fullscreen"}</span>
                            <div class={`custom-tooltip x ${theme}`}>{isFullScreenInput ? "Minimize" : "Maximize"}</div>
                        </button>
                        <input type="file" id="input" style={{display: "none"}} onChange={importInput}/>
                    </div>
                </div>
                <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
            </div>
            <div className={`container ${theme}`} style={isFullScreenOutput ? styles.fullScreen: {}}>
                <div className={`header ${theme}`}>
                    <strong>𝙊𝙪𝙩𝙥𝙪𝙩 :</strong>
                    <div className="IOM">
                        <button className={`btn ${theme}`} style={{border: "none"}} onClick={exportOutput}>
                            <span className="material-icons">cloud_upload</span>
                            <div class={`custom-tooltip ${theme}`}>Export Input</div>
                        </button>
                        <button className={`btn ${theme}`} onClick={fullScreenOutput}>
                            <span className="material-icons">{isFullScreenOutput ? "fullscreen_exit" : "fullscreen"}</span>
                            <div class={`custom-tooltip x ${theme}`}>{isFullScreenOutput ? "Minimize" : "Maximize"}</div>
                        </button>
                    </div>
                </div>
                <textarea readOnly value={output} onChange={(e) => setOutput(e.target.value)}></textarea>
            </div>
        </div>
    </div>
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