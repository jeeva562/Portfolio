function getKey(storageKey, serviceName, prefix) {
    const stored = localStorage.getItem(storageKey) || sessionStorage.getItem(storageKey);
    if (stored && stored.startsWith(prefix) && stored.length > prefix.length + 10) {
        return stored;
    }
    const key = prompt(`Please enter your ${serviceName} API key:`);
    if (!key || !key.startsWith(prefix)) {
        alert(`Invalid key format. ${serviceName} keys start with "${prefix}"`);
        return null;
    }
    if (confirm('Store key permanently in localStorage?')) {
        localStorage.setItem(storageKey, key);
    } else {
        sessionStorage.setItem(storageKey, key);
    }
    return key;
}

export default {
    getOpenAIKey: () => getKey('openai_key', 'OpenAI', 'sk-'),
    getHuggingFaceKey: () => getKey('hf_key', 'Hugging Face', 'hf_')
};