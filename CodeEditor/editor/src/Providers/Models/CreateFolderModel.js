import "./CreateFolderModel.scss"
import "./CreateCodegroundModel.scss"
import { useContext } from "react";
import { ModelContext } from "../ModelProvider";
import { CodegroundContext } from "../CodegroundProvider";

export const CreateFolderModel = () => {
    const {createNewFolder} = useContext(CodegroundContext);
    const modelFeatures= useContext(ModelContext);
    
    const closeModel = () => {
        modelFeatures.closeModel();
    };

    const onSubmitModel = (e) => {
        e.preventDefault();
        const folderName= e.target.folderName.value;
        createNewFolder(folderName);
        closeModel();
    };

    return <div className="model-container">
        <form className="model-body" onSubmit={onSubmitModel}>
            <span onClick={closeModel} className="material-icons close">close</span>
            <h1>Create New Folder</h1>
            <div style = {createFolderStyles.inputContainer}>
                <input name="folderName" style={createFolderStyles.input} placeholder="Enter Folder Name" required/>
                <button class="button-33" type="submit">Create Folder</button>
            </div>
        </form>
    </div>
}

export const createFolderStyles = {
    inputContainer: {
        display: 'flex',
        gap: 10
    },
    input: {
        flexGrow: 1,
        border: 'none',
        backgroundColor: '#d5d9e0',
        borderRadius: '7px',
        padding: '12px',
    }
}