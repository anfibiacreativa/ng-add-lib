import { Tree, SchematicsException } from '@angular-devkit/schematics';

// utility function to read and buffer JSON files
export default function getJSONBuffer<T>(tree: Tree, path: string):T {
  const JSONBuffer = tree.read(path);

  if (!JSONBuffer) {
    // let's throw an error if we gte no buffer
    throw new SchematicsException();
  }

  try {
    const JSONRaw = JSON.parse(JSONBuffer.toString('utf-8'));
    return JSONRaw;
  } catch (error) {
    throw new SchematicsException()
  } 
}