"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarConfig = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const config_1 = require("@schematics/angular/utility/config");
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
function actualizarConfig(_options) {
    return schematics_1.chain([
        schematics_1.schematic('agregar-alias', _options),
        (tree, _context) => {
            // since project name is dynamic, we need to retrieve it from the config of the workspace
            const workspace = config_1.getWorkspace(tree);
            const project = (Object.keys(workspace.projects)[0]).toString();
            const dir = _options.dir;
            const folder = _options.folder;
            const styles = [`./${dir}/${folder}/styles/styles.scss`];
            const angularConfigPath = './angular.json';
            let angularConfigBuffer;
            _context.logger.info(Object.keys(workspace.projects)[0] + ' workspace');
            if (tree.exists(angularConfigPath)) {
                angularConfigBuffer = tree.read(angularConfigPath);
            }
            if (!angularConfigBuffer) {
                return;
            }
            // read current angular configuration (the one OOTB when generating a new project with CLi)
            const rawAngularConfig = JSON.parse(angularConfigBuffer.toString('utf8'));
            // cash the necessary object properties, to modify angular.kson later
            const options = Object.assign({}, rawAngularConfig['projects'][project]['architect']['build']['options']);
            // assign new value to use the new location for default styles
            options['styles'] = styles;
            // produce a new angular.json object, that includes our stylePreprocesor Options
            const updatedAngularConfig = Object.assign(Object.assign({}, rawAngularConfig), {
                projects: Object.assign(Object.assign({}, rawAngularConfig['projects']), { [project]: Object.assign(Object.assign({}, rawAngularConfig['projects'][project]), { architect: Object.assign(Object.assign({}, rawAngularConfig['projects'][project]['architect']), { build: Object.assign(Object.assign({}, rawAngularConfig['projects'][project]['architect']['build']), { options: Object.assign(Object.assign({}, rawAngularConfig['projects'][project]['architect']['build']['options']), { styles }) }) }) }) })
            });
            // overwrite the angular configuration including the path to our new scss structure
            tree.overwrite(angularConfigPath, JSON.stringify(updatedAngularConfig, null, 2));
            return tree;
        }
    ]);
}
exports.actualizarConfig = actualizarConfig;
//# sourceMappingURL=index.js.map