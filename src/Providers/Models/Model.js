import { useContext } from "react"
import { modelConstants, ModelContext } from "../ModelProvider"
import { CreateCodegroundModel } from "./CreateCodegroundModel";
import { CreateFolderModel } from "./CreateFolderModel";
import { UpdateFolderTitleModel } from "./UpdateFolderTitleModel";
import { UpdateFileTitleModel } from "./UpdateFileTitleModel";
import { CreateCardModel } from "./CreateCardModel";


export const Model = () => {
    const modelFeatures= useContext(ModelContext);
    return <>
        {modelFeatures.activeModel===modelConstants.CREATE_CODEGROUND && <CreateCodegroundModel />}
        {modelFeatures.activeModel===modelConstants.CREATE_FOLDER && <CreateFolderModel />}
        {modelFeatures.activeModel===modelConstants.UPDATE_FOLDER_TITLE && <UpdateFolderTitleModel />}
        {modelFeatures.activeModel===modelConstants.UPDATE_FILE_TITLE && <UpdateFileTitleModel />}
        {modelFeatures.activeModel===modelConstants.CREATE_CARD && <CreateCardModel />}
    </>
}