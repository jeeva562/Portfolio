const config = {
    
    getOpenAIKey: () => {
        const key = localStorage.getItem('openai_key') || 
                   sessionStorage.getItem('openai_key') || 
                   prompt('Please enter your OpenAI API key:');
        if (key && key !== 'YOUR_OPENAI_API_KEY_HERE') {
            return key;
        }
        return null;
    },
    
    getHuggingFaceKey: () => {
        const key = localStorage.getItem('hf_key') || 
                   sessionStorage.getItem('hf_key') || 
                   prompt('Please enter your Hugging Face API key:');
        if (key && key !== 'hf_your_key_here') {
            return key;
        }
        return null;
    }
};

export default config;