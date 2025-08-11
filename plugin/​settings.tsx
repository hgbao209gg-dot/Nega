import { storage } from "@vendetta/plugin"
import { General } from "@vendetta/ui/components"
import { TextInput, ScrollView, Text } from "react-native"
import { settings } from "./index"

const { FormRow, FormSwitch, FormSection, FormDivider } = General

export default () => {
    return (
        <ScrollView>
            <FormSection title="Gemini Translator Settings">
                <FormRow 
                    label="Gemini API Key" 
                    subLabel="Enter your Gemini API Key here."
                >
                    <TextInput
                        style={{ color: "var(--text-normal)" }}
                        value={settings.gemini_api_key}
                        onChangeText={(value) => {
                            settings.gemini_api_key = value
                        }}
                        placeholder="Paste your API key here..."
                        secureTextEntry={true}
                    />
                </FormRow>
                <FormDivider />
                <FormRow 
                    label="Target Language" 
                    subLabel="Enter the two-letter code for the target language (e.g., en, vi, ja)."
                >
                    <TextInput
                        style={{ color: "var(--text-normal)" }}
                        value={settings.target_lang}
                        onChangeText={(value) => {
                            settings.target_lang = value
                        }}
                        placeholder="en"
                    />
                </FormRow>
            </FormSection>
        </ScrollView>
    )
}
