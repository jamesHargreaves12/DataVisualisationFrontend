import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FileLoader, Group } from "three";
import { ungzip } from "pako";

// There is so much we can do here to compress these files in a custom way but for now lets just do something quick.
// current performance comparison for loading 8 objs locally / 4 on ghpages :
//              Locally       ghpages
// OBJLoader    4.8           16.25
// Compressed   13.8          8.25
export class CompressedObjLoader extends OBJLoader {
  load(
    url: string,
    onLoad: (group: Group) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void
  ) {
    const scope = this;

    const loader = new FileLoader(this.manager);
    loader.setResponseType("arraybuffer");
    loader.setPath(this.path);
    loader.setRequestHeader(this.requestHeader);
    loader.setWithCredentials(this.withCredentials);
    loader.load(
      url,
      function (res) {
        try {
          const buffer = res as ArrayBuffer;
          const decompressed = ungzip(new Uint8Array(buffer), {
            to: "string",
          });
          onLoad(scope.parse(decompressed));
        } catch (e) {
          if (onError) {
            onError(e);
          } else {
            console.error(e);
          }

          scope.manager.itemError(url);
        }
      },
      onProgress,
      onError
    );
  }
}
