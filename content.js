console.log('ChatGPT ClipGenius content script loaded');

let lastClipboardContent = '';

function pollClipboard() {
    navigator.clipboard.readText()
        .then(text => {
            // Check if the clipboard content has changed and matches a typical markdown structure (customize this regex as needed)
            if (text !== lastClipboardContent && /(\*\*.*\*\*|\[.*\]\(.*\)|\*.*\*|etc.)/.test(text)) {
                lastClipboardContent = text;
                transformClipboardToRichText();
            }
        })
        .catch(err => {
            console.error('Failed to read clipboard:', err);
        });
}

setInterval(pollClipboard, 1000);  // Poll every second


function transformClipboardToRichText() {
    console.log('Attempting to transform clipboard text');
    // Read the clipboard data
    navigator.clipboard.readText()
        .then(text => {
            // Convert markdown to rich text (HTML)
            const transformedText = marked.parse(text);

            // Here, you can decide how you want to proceed with the HTML. 
            // For now, I'm just writing it back to the clipboard, but you might want to provide an option 
            // for the user to paste the HTML into their desired location.
            return navigator.clipboard.writeText(transformedText);
        })
        .then(() => {
            console.log('Text has been transformed to rich text (HTML) and written to the clipboard.');
        })
        .catch(err => {
            console.error('Failed to read or write clipboard:', err);
        });
}


