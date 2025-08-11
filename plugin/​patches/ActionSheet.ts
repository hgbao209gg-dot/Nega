import { findByProps } from "@vendetta/metro"
import { findByStoreName } from "@vendetta/metro"
import { storage } from "@vendetta/plugin"
import { Gemini, geminiAPI } from "../utils/gemini"
import { showToast } from "@vendetta/ui/toasts"
import { openModal } from "@vendetta/ui/modals"
import { ActionSheet } from "@vendetta/ui/components"

const MessageActions = findByProps("openActionSheet")
const MessageStore = findByStoreName("MessageStore")

export default () => MessageActions.openActionSheet = ((...args) => {
    const [actionSheet, data] = args
    const { message } = data
    if (!message || !message.content) return

    const { gemini_api_key, target_lang } = storage
    if (!gemini_api_key || !target_lang) return

    actionSheet.splice(2, 0, {
        icon: "translate",
        label: "Translate with Gemini",
        onPress: async () => {
            showToast("Translating...", { icon: "translate" })
            try {
                const translatedText = await geminiAPI.translate(message.content, target_lang)
                openModal((props) => (
                    <ActionSheet {...props}>
                        <Text style={{ padding: 16 }}>
                            {translatedText}
                        </Text>
                    </ActionSheet>
                ))
            } catch (err) {
                showToast(`Translation failed: ${err.message}`, { icon: "error" })
            }
        }
    })

    return args
})
