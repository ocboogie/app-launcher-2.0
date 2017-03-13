
declare module 'electron-is-accelerator' {
    export default function (accelerator: string): boolean
}
declare module 'electron-config';
declare module 'gaze';
declare module 'electron-localshortcut';

interface StoreJSON {
    config: Config.formattedJSON;
    grid: Grid.formattedJSON;
    notify: {
        text: string;
        activated: boolean;
    }
}

type ExtensionTypes = "web"
type ReduxTypes = "INIT" | "CONFIG_INIT" | "CONFIG_RELOAD" | "GRID_INIT" | "GRID_RELOAD" | "GRID_LOAD" | "GRID_BACK" | "GRID_ROOT" | "NOTIFY_DISPLAY" | "NOTIFY_DESTROY";

interface Action {
    type: ReduxTypes;
    payload: any;
}

declare namespace Config {
    interface JSON {
        rootGrid?: Grid.JSON;
        windowSize: number;
        buttonColors?: string[];
        style?: React.CSSProperties;
        debug?: boolean;
        hotkey: string;
        alwaysOnTop: boolean;
        launcherFolder: string;
    }

    interface formattedJSON {
        rootGrid?: Grid.formattedJSON;
        buttonColors?: string[];
        style?: React.CSSProperties;
        debug?: boolean;
        launcherFolder: string;
    }

}

declare namespace Grid {
    interface JSON {
        buttons: Button.JSON[];
        buttonColors: string[];
    }

    interface formattedJSON {
        buttons: Button.formattedJSON[];
        buttonColors: string[];
        parent?: Grid.formattedJSON;
        isRoot: boolean;
    }
}

declare namespace Button {
    type unformattedButtonTypes = "url" | "app" | "cmd" | "grid" | "short folder" | "long folder";

    type formattedButtonTypes = "url" | "app" | "cmd" | "grid";

    interface JSON {
        text: string;
        type: unformattedButtonTypes;
        value: Grid.JSON | string;
        color?: string;
    }

    interface formattedJSON {
        text: string;
        type: formattedButtonTypes;
        value: Grid.formattedJSON | string;
        color?: string;
    }

    type buttonCPNT = React.ReactElement<Button.formattedJSON>;
}

