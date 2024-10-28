import { useContext } from "react";
import "./index.scss";
import { CodegroundContext } from "../../../Providers/CodegroundProvider";
import { modelConstants, ModelContext } from "../../../Providers/ModelProvider";
import { useNavigate } from "react-router-dom";

const Folder = ({ folderTitle, cards, id }) => {
    const { deleteFolder, deleteFile } = useContext(CodegroundContext);
    const { openModel, setModelPayload } = useContext(ModelContext);
    const navigate = useNavigate();

    const onDeleteFolder = () => {
        deleteFolder(id);
    };

    const onEditFolderTitle = () => {
        setModelPayload(id);
        openModel(modelConstants.UPDATE_FOLDER_TITLE);
    }

    const openCreateCardModel = () => {
        setModelPayload(id);
        openModel(modelConstants.CREATE_CARD);
    }

    return (
        <div className="folder-container">
            <div className="folder-header">
                <div className="folder-header-item">
                    <img src="Folder.png" alt="Folder image" />
                    <span className="folder-title">
                        {folderTitle}
                    </span>
                </div>
                <div className="folder-header-item">
                    <button className={`btn vs-light`}>
                        <span className="material-icons" onClick={onDeleteFolder}>delete_forever</span>
                    </button>
                    <button className={`btn vs-light`}>
                        <span className="material-icons" onClick={onEditFolderTitle}>edit</span>
                    </button>
                    <button className="button-33" onClick={openCreateCardModel}>
                        <span className="material-icons">add</span>
                        <span>New Codeground</span>
                    </button>
                </div>
            </div>
            <div className="cards-container">
                {cards.map((file, index) => {
                    const onEditFile = () => {
                        setModelPayload({ fileId: file.id, id: id });
                        openModel(modelConstants.UPDATE_FILE_TITLE);
                    };
                    const onDeleteFile = () => {
                        deleteFile(id, file.id);
                    }
                    const navigateToCodegroundScreen = () => {
                        navigate(`/codeground/${file.id}/${id}`);
                    }
                    return (
                        <div className="card" key={index} onClick={navigateToCodegroundScreen}>
                            <img src="logo1.png" alt="logo" />
                            <div className="title-container">
                                <span style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "15px" }}>
                                    {file?.title}
                                </span>
                                <span
                                    style={{
                                        fontStyle: "italic",
                                        fontWeight: "bold",
                                        fontFamily: "Poppins, sans-serif",
                                        fontSize: "12px"
                                    }}
                                >
                                    Language: {file?.language}
                                </span>
                            </div>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <button className={`btn vs-light`}>
                                    <span
                                        className="material-icons"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteFile();
                                        }}>
                                        delete_forever
                                    </span>
                                </button>
                                <button className={`btn vs-light`}>
                                    <span
                                        className="material-icons"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEditFile();
                                        }}>
                                        edit
                                    </span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const RightComponent = () => {
    const { folders } = useContext(CodegroundContext);
    const modelFeatures = useContext(ModelContext);

    const openCreateNewFolderModel = () => {
        modelFeatures.openModel(modelConstants.CREATE_FOLDER);
    }

    return (
        <div className="right-container">
            <div className="header">
                <div className="title">
                    <span>My</span> Codeground
                </div>
                <button className="button-33 create-new-folder" onClick={openCreateNewFolderModel}>
                    <span className="material-icons">add</span>
                    <span>New Folder</span>
                </button>
            </div>
            {folders.map((folder) => (
                <Folder folderTitle={folder.title} cards={folder.files} key={folder.id} id={folder.id} />
            ))}
        </div>
    );
};