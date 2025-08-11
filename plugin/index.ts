import { storage } from "@vendetta/plugin"
import patchActionSheet from "./patches/ActionSheet"
import patchCommands from "./patches/Commands"
import Settings from "./settings"

export const settings: {
    gemini_api_key?: string
    target_lang?: string
} = storage

settings.target_lang ??= "en"

let patches = []

export default {
    onLoad: () => patches = [
        patchActionSheet(),
        patchCommands()
    ],
    onUnload: () => { for (const unpatch of patches) unpatch() },
    settings: Settings
}
