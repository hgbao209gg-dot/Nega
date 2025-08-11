import { storage } from "@vendetta/plugin"
import { showToast } from "@vendetta/ui/toasts"

export const geminiAPI = {
    translate: async (text: string, target_lang: string) => {
        const { gemini_api_key } = storage
        if (!gemini_api_key) {
            throw new Error("Gemini API key is not set.")
        }
        
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${gemini_api_key}`
        
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `Translate the following text to ${target_lang}: ${text}`
                            }
                        ]
                    }
                ]
            })
        })
        
        const json = await response.json()
        
        if (json.candidates && json.candidates[0] && json.candidates[0].content) {
            return json.candidates[0].content.parts[0].text
        } else {
            throw new Error("Invalid response from Gemini API.")
        }
    }
}
