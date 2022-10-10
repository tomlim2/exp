export const copyByClick = ( textToCopy: string) => {

    copyTextToClipboard(textToCopy)

    const fallbackCopyTextToClipboard = (text:string) => {
      const textArea = document.createElement("textarea");
      textArea.value = text;

      // Avoid scrolling to bottom
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        alert('Copied ' + msg);
      } catch (err) {
        alert('Fallback: Oops, unable to copy ' + err);
      }

      document.body.removeChild(textArea);
    }

    function copyTextToClipboard(text: string) {
      if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
      }
      navigator.clipboard.writeText(text).then(function() {
        alert('Copied!');
      }, function(err) {
        alert('Fallback: Oops, unable to copy ' + err);
      });
    }
  }