"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ngAdd = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
function ngAdd(_options) {
    return schematics_1.chain([
        installPackageJsonDependencies,
        schematics_1.schematic('reconfig', _options)
    ]);
}
exports.ngAdd = ngAdd;
function installPackageJsonDependencies() {
    return (tree, _context) => {
        _context.addTask(new tasks_1.NodePackageInstallTask());
        _context.logger.info(`Installing the library...`);
        return tree;
    };
}
//# sourceMappingURL=index.js.map