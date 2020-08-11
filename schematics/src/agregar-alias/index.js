"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agregarAlias = void 0;
const strings_1 = require("@angular-devkit/core/src/utils/strings");
// You don't have to export the function as default. You can also have more than one rule factory
// per file.
function agregarAlias(_options) {
    return (tree, _context) => {
        _context.logger.info('⚙️⚙️ Reconfigurando compiler options y estilos por defecto 🧐');
        // make some verifications before moving on
        tree.getDir('/').visit(filePath => {
            if (filePath.includes('node_modules')) {
                return;
            }
            if (!filePath.endsWith('tsconfig.app.json')) {
                return;
            }
            const tsConfigBuffer = tree.read(filePath);
            if (!tsConfigBuffer) {
                return;
            }
            // cache the tsconfig file contents in order to update them with our aliases
            const rawTsConfig = JSON.parse(tsConfigBuffer.toString('utf-8'));
            tree.overwrite(filePath, rawTsConfig);
            // cache both the paths property as object
            const paths = Object.assign({}, rawTsConfig['compilerOptions']['paths']);
            // and create an alias constant that is equal to the dasherized name we pass as options
            const alias = strings_1.decamelize(_options.name);
            paths[`@${alias}/*`] = [`src/app/${alias}/styles`, `src/app/${alias}/styles/abstracts`];
            // actually modify the file
            const decoratedTsConfigJSON = Object.assign(Object.assign({}, rawTsConfig), { compilerOptions: Object.assign(Object.assign({}, rawTsConfig['compilerOptions']), { paths }) });
            // overwrite the tsconfigfile!
            tree.overwrite(filePath, JSON.stringify(decoratedTsConfigJSON, null, 2));
        });
        return tree;
    };
}
exports.agregarAlias = agregarAlias;
//# sourceMappingURL=index.js.map