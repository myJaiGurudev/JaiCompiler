import { useContext } from "react"
import "./CreateCodegroundModel.scss"
import { ModelContext } from "../ModelProvider"
import { createFolderStyles } from "./CreateFolderModel";
import { CodegroundContext } from "../CodegroundProvider";

export const UpdateFileTitleModel = () => {
    const {closeModel, modelPayload} = useContext(ModelContext);
    const {editFileTitle} = useContext(CodegroundContext);
    
    const onSubmitModel = (e) => {
        e.preventDefault();
        const fileName = e.target.fileName.value;
        editFileTitle(fileName, modelPayload.id, modelPayload.fileId);
        closeModel();
    };


    return <div className="model-container">
        <form className="model-body" onSubmit={onSubmitModel}>
            <span onClick={closeModel} className="material-icons close">close</span>
            <h1>Update Card Title</h1>
            <div style = {createFolderStyles.inputContainer}>
                <input name="fileName" style={createFolderStyles.input} placeholder="Enter Card Name" required/>
                <button class="button-33" type="submit">Update Card Name</button>
            </div>
        </form>
    </div>
}