import { Rule, SchematicContext, Tree, chain, schematic } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngAdd(_options: any): Rule {
  return chain([
    installPackageJsonDependencies,
    schematic('reconfig', _options)
  ])
}

function installPackageJsonDependencies(): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.addTask(new NodePackageInstallTask());

    _context.logger.info(`Installing the library...`);

    return tree;
  };
}