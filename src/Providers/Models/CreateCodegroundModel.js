import { useContext } from "react"
import "./CreateCodegroundModel.scss"
import { ModelContext } from "../ModelProvider"
import { CodegroundContext } from "../CodegroundProvider";
export const CreateCodegroundModel = () => {
    const modelFeatures= useContext(ModelContext);
    const codegroundFeatures= useContext(CodegroundContext);
    const closeModel = () => {
        modelFeatures.closeModel();
    }

    const onSubmitModel = (e) => {
        e.preventDefault();
        const folderName= e.target.folderName.value;
        const fileName= e.target.fileName.value;
        const language= e.target.language.value;
        codegroundFeatures.createNewCodeground({
            folderName,
            fileName,
            language
        });
        closeModel();
    }

    return <div className="model-container">
        <form className="model-body" onSubmit={onSubmitModel}>
            <span onClick={closeModel} className="material-icons close">close</span>
            <h1>Create New Codeground</h1>
            <div className="item">
                <p>Enter folder name: </p>
                <input name="folderName" required/>
            </div>
            <div className="item">
                <p>Enter card name: </p>
                <input name="fileName" required/>
            </div>
            <div className="item">
                <select name="language" required>
                    <option value="cpp">C++</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="javascript">JavaScript</option>
                </select>
                <button class="button-33" role="button" type="submit">
                    Create Codeground
                </button>
            </div>
        </form>
    </div>
}
