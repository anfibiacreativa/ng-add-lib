"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
// utility function to read and buffer JSON files
function getJSONBuffer(tree, path) {
    const JSONBuffer = tree.read(path);
    if (!JSONBuffer) {
        // let's throw an error if we gte no buffer
        throw new schematics_1.SchematicsException();
    }
    try {
        const JSONRaw = JSON.parse(JSONBuffer.toString('utf-8'));
        return JSONRaw;
    }
    catch (error) {
        throw new schematics_1.SchematicsException();
    }
}
exports.default = getJSONBuffer;
//# sourceMappingURL=getJSONBuffer.js.map