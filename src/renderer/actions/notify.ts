export function display(text: string): Action {
    return {
        "type": "NOTIFY_DISPLAY",
        "payload": { text: text, activated: true }
    }
}

export function destroy(): Action {
    return {
        "type": "NOTIFY_DESTROY",
        "payload": { text: "", activated: false }
    }
}