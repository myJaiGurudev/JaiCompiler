import { createContext, useState } from "react";

export const ModelContext= createContext();

export const modelConstants = {
    CREATE_CODEGROUND: 'CREATE_CODEGROUND',
    CREATE_FOLDER: 'CREATE_FOLDER',
    UPDATE_FOLDER_TITLE: 'UPDATE_FOLDER_TITLE',
    UPDATE_FILE_TITLE: 'UPDATE_FILE_TITLE',
    CREATE_CARD: "CREATE_CARD"
}

export const ModelProvider = ({children}) => {

    const [modelType, setModelType] = useState(null);

    const [modelPayload,setModelPayload] = useState(null);

    const closeModel= () => {
        setModelPayload(null);
        setModelType(null);
    }

    const modelFeatures= {
        openModel:setModelType,
        closeModel,
        activeModel: modelType,
        modelPayload,
        setModelPayload
    }
    return (
        <ModelContext.Provider value={modelFeatures}>
            {children}

        </ModelContext.Provider>
    );
}