import { findByProps } from "@vendetta/metro"
import { storage } from "@vendetta/plugin"
import { Gemini, geminiAPI } from "../utils/gemini"
import { showToast } from "@vendetta/ui/toasts"

const commands = findByProps("registerCommand")

export default () => commands.registerCommand({
    name: "trans",
    description: "Translate text using Gemini AI",
    options: [
        {
            name: "text",
            description: "The text to translate",
            type: 3, // String
            required: true
        }
    ],
    execute: async (args) => {
        const text = args[0].value
        const { gemini_api_key, target_lang } = storage
        
        if (!gemini_api_key || !target_lang) {
            return {
                content: "Please set your Gemini API key and target language in the plugin settings.",
                ephemeral: true // Only you can see this message
            }
        }

        try {
            const translatedText = await geminiAPI.translate(text, target_lang)
            return {
                content: `**Original:** ${text}\n**Translated:** ${translatedText}`
            }
        } catch (err) {
            return {
                content: `Translation failed: ${err.message}`,
                ephemeral: true
            }
        }
    }
})
