import { useContext } from "react";
import { Model } from "../../Providers/Models/Model";
import "./index.scss"
import { RightComponent } from "./RightComponent";
import { modelConstants, ModelContext } from "../../Providers/ModelProvider";

export const HomeScreen=() => {
    const modelFeatures= useContext(ModelContext);

    const openCreateCodegroundModel = () => {
        modelFeatures.openModel(modelConstants.CREATE_CODEGROUND);
    };

    return (
        <div className="home-container">
            <div className="left-container">
                <div className="items-container">
                    <img src="logo2.png"/>
                    <h1>JaiCompiler</h1>
                    <h2>Write.Execute.Perfect</h2>
                    <button class="button-33" role="button" onClick={openCreateCodegroundModel}>
                        <span class="material-icons">add</span>
                        <span>&nbsp;<strong>Create Codeground</strong></span>
                    </button>
                </div>
            </div>
            <RightComponent />
            <Model/>
        </div>
    );
}