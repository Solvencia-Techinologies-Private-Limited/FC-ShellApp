import 'zone.js';
export interface RemoteContainer{
    init(shareScope:any): Promise<void>;
    get(module: string): Promise<() => any>;
}

declare global{
    interface Window{
        [key: string]: RemoteContainer
    }
    var __webpack_share_scopes__: {
        default: any;
    };
}

/*dynamically loads remoteEntry.js script and fetches exposed module */

export async function loadRemoteComponent(remoteUrl: string,scopeName: string, moduleName: string){
    const remoteEntryUrl = `${remoteUrl}/remoteEntry.js`;
    let container: RemoteContainer;
    try{
        const remoteModule = await import(/*@vite-ignore*/ remoteEntryUrl);
        container = window[scopeName] || remoteModule.default || remoteModule;
    } catch(err) {
        throw new Error(`Failed to load script ${remoteEntryUrl}: ${err}`);
    }
    
    if(!container || typeof container.get !== 'function'){
        throw new Error(`Container '${scopeName}' was loaded from ${remoteEntryUrl} but does not export a valid Module Federation interface`);
    }

    if(typeof container.init === 'function'){
        const shareScope = typeof __webpack_share_scopes__ !== 'undefined' ? __webpack_share_scopes__.default : {};
        try {
            await container.init(shareScope);
        } catch(e) {
            console.error(e);
        }
    }
    const factory = await container.get(moduleName);
    const Module = factory();
    return Module;
}