export interface PackageJSON {
    dependencies: Dependency;
    devDependencies: Dependency;
}
export interface Dependency {
    [dependencyName: string]: string;
}
