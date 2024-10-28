import { useContext } from "react"
import "./CreateCodegroundModel.scss"
import { ModelContext } from "../ModelProvider"
import { CodegroundContext } from "../CodegroundProvider";
import { createFolderStyles } from "./CreateFolderModel";

export const UpdateFolderTitleModel = () => {

    const {closeModel, modelPayload} = useContext(ModelContext);

    const {editFolderTitle} = useContext(CodegroundContext);

    const onSubmitModel = (e) => {
        e.preventDefault();
        const folderName= e.target.folderName.value;
        editFolderTitle(folderName,modelPayload);
        closeModel();
    }

    return <div className="model-container">
        <form className="model-body" onSubmit={onSubmitModel}>
            <span onClick={closeModel} className="material-icons close">close</span>
            <h1>Update Folder Title</h1>
            <div style = {createFolderStyles.inputContainer}>
                <input name="folderName" style={createFolderStyles.input} placeholder="Enter Folder Name" required/>
                <button class="button-33" type="submit">Update Folder</button>
            </div>
        </form>
    </div>
}