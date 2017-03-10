let platform = process.platform;

let hotkey: string;

if (platform === 'darwin') {
    hotkey = 'Cmd+Ctrl+C';  
} else {
    hotkey = 'Super+C';
}

export default {
    windowSize: 500,
    hotkey: hotkey,
    alwaysOnTop: true
}