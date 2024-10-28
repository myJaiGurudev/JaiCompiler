import { useContext } from "react"
import "./CreateCodegroundModel.scss"
import { ModelContext } from "../ModelProvider"
import { v4 } from "uuid";
import { CodegroundContext, defaultCode } from "../CodegroundProvider";

export const CreateCardModel = () => {

    const {closeModel, modelPayload} = useContext(ModelContext);
    const {createCodeground} = useContext(CodegroundContext);

    const onSubmitModel = (e) => {
        e.preventDefault();
        const fileName=e.target.fileName.value;
        const language=e.target.language.value;
        const file = {
            id: v4(),
            title: fileName,
            language,
            code: defaultCode[language]
        }
        createCodeground(modelPayload, file);
        closeModel();
    };


    return <div className="model-container">
        <form className="model-body" onSubmit={onSubmitModel}>
            <span onClick={closeModel} className="material-icons close">close</span>
            <h1>Create New Codeground</h1>
            <div className="item">
                <p>Enter card name: </p>
                <input name="fileName" placeholder="Enter Card Title" required/>
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