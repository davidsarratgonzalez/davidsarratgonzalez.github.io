// Basic markdown processor for resume content
export const processMarkdown = (text) => {
  if (!text || typeof text !== 'string') return text;

  // Process bold text: **text** and ****text****
  let processed = text
    .replace(/\*\*\*\*([^*]+)\*\*\*\*/g, '<strong>$1</strong>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  // Process lists: lines starting with "- " after newlines
  const lines = processed.split('\n');
  const processedLines = [];
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('- ')) {
      // Start or continue a list
      if (!inList) {
        processedLines.push('<ul>');
        inList = true;
      }
      processedLines.push(`<li>${line.substring(2).trim()}</li>`);
    } else if (line === '' && inList) {
      // Empty line in list - continue list
      continue;
    } else {
      // Close list if we were in one
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }
      
      // Add regular line
      if (line !== '') {
        processedLines.push(line);
      } else {
        processedLines.push('<br/>');
      }
    }
  }
  
  // Close list if still open
  if (inList) {
    processedLines.push('</ul>');
  }
  
  return processedLines.join('\n');
};

// Render processed markdown as JSX
export const renderMarkdown = (text) => {
  const processed = processMarkdown(text);
  
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: processed }}
      className="markdown-content"
    />
  );
}; 