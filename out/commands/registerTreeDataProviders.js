"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTreeDataProviders = void 0;
const vscode = require("vscode");
const CommonHelper_1 = require("../helpers/CommonHelper");
const DataverseHelper_1 = require("../helpers/DataverseHelper");
const DataverseConnectionDataProvider_1 = require("../trees/DataverseConnectionDataProvider");
const EntitiesDataProvider_1 = require("../trees/EntitiesDataProvider");
const WebResourcesDataProvider_1 = require("../trees/WebResourcesDataProvider");
function registerTreeDataProviders(vscontext) {
    const dvHelper = new DataverseHelper_1.DataverseHelper(vscontext);
    const commonHelper = new CommonHelper_1.CommonHelper(vscontext, dvHelper);
    const dataverseConnProvider = new DataverseConnectionDataProvider_1.DataverseConnectionDataProvider(vscontext);
    vscode.window.registerTreeDataProvider("dvConnections", dataverseConnProvider);
    const entityMetadataProvider = new EntitiesDataProvider_1.EntitiesDataProvider(vscontext, dvHelper);
    vscode.window.registerTreeDataProvider("dvEntities", entityMetadataProvider);
    const wrProvider = new WebResourcesDataProvider_1.WebResourcesDataProvider(vscontext, commonHelper);
    vscode.window.registerTreeDataProvider("dvWebResources", wrProvider);
    const cmds = new Array({
        command: "dvdt.explorer.connections.refreshConnection",
        callback: () => dataverseConnProvider.refresh(),
    }, {
        command: "dvdt.explorer.entities.loadEntities",
        callback: () => entityMetadataProvider.refresh(),
    }, {
        command: "dvdt.explorer.webresources.loadWebResources",
        callback: () => wrProvider.refresh(),
    });
    cmds.forEach((c) => {
        vscontext.subscriptions.push(vscode.commands.registerCommand(c.command, c.callback));
    });
}
exports.registerTreeDataProviders = registerTreeDataProviders;
//# sourceMappingURL=registerTreeDataProviders.js.map