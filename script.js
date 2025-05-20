function typeWriter(elementId, text, speed) {
  return new Promise((resolve) => {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with ID "${elementId}" not found.`);
      resolve(); // Resolve the promise even if the element is not found to not block execution
      return;
    }
    let i = 0;
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }
    type();
  });
}

function finalizeLine(commandElementId) {
  const commandElement = document.getElementById(commandElementId);
  if (!commandElement) {
    console.error(`Element with ID "${commandElementId}" not found for finalizing.`);
    return;
  }
  const terminalElement = document.getElementById('terminal');
  if (!terminalElement) {
    console.error(`Element with ID "terminal" not found.`);
    return;
  }

  const newParagraph = document.createElement('p');
  // The prompt span is already part of the static HTML for current-command's parent
  // For finalized lines, we need to add it.
  newParagraph.innerHTML = `<span class="prompt">> </span>${commandElement.innerHTML}`;
  
  // The #current-command is a span, its parent is the <p> tag we want to insert before
  const currentCommandParagraph = commandElement.parentElement; 
  if (currentCommandParagraph && currentCommandParagraph.parentElement === terminalElement) {
    terminalElement.insertBefore(newParagraph, currentCommandParagraph);
  } else {
    // Fallback if structure is not as expected, though currentCommandParagraph should always exist
    terminalElement.appendChild(newParagraph); 
  }
  
  commandElement.innerHTML = ''; // Clear for the next command
}

async function init() {
  const bootMessage = "LLM v0.1 booting up...";
  const introLine = "Hello, I am a Mini Language Entity. Friends call me MLE.";
  const learningLine = "I am still learning and exploring this vast digital world.";
  const speed = 75; // ms

  const currentCommandElement = document.getElementById('current-command');
  const terminalElement = document.getElementById('terminal');

  // Remove initial empty paragraphs meant for these messages if they exist from HTML
  // as per the new logic of typing into current-command and then finalizing.
  // The HTML provided has:
  // <p><span class="prompt">> </span><span id="boot-message"></span></p>
  // <p><span class="prompt">> </span><span id="intro-line"></span></p>
  // <p><span class="prompt">> </span><span id="learning-line"></span></p>
  // These should be removed or not used if we're typing into current-command and then creating new <p> tags.

  // Let's assume the provided HTML structure is:
  // <div id="terminal">
  //   <!-- Static lines for boot, intro, learning will be created by finalizeLine -->
  //   <p><span class="prompt">> </span><span id="current-command"></span><span class="cursor"> </span></p>
  // </div>
  // And the initial paragraphs with IDs boot-message, intro-line, learning-line are not what we type into.
  // The subtask description for HTML update (subtask 5) already created these:
  // <p><span class="prompt">> </span><span id="boot-message"></span></p>
  // <p><span class="prompt">> </span><span id="intro-line"></span></p>
  // <p><span class="prompt">> </span><span id="learning-line"></span></p>
  // <p><span class="prompt">> </span><span id="current-command"></span><span class="cursor"> </span></p>
  // The refined logic says to type into 'current-command' and then use finalizeLine to move it.
  // This means the initial p tags for boot-message, intro-line, learning-line are not directly used by typeWriter.
  // Let's clear them first to avoid confusion, as finalizeLine will create new <p> elements.

  const bootMessageElem = document.getElementById('boot-message');
  if (bootMessageElem && bootMessageElem.parentElement) bootMessageElem.parentElement.remove();
  const introLineElem = document.getElementById('intro-line');
  if (introLineElem && introLineElem.parentElement) introLineElem.parentElement.remove();
  const learningLineElem = document.getElementById('learning-line');
  if (learningLineElem && learningLineElem.parentElement) learningLineElem.parentElement.remove();


  if (!currentCommandElement || !terminalElement) {
    console.error("Required elements 'current-command' or 'terminal' not found.");
    return;
  }

  await typeWriter('current-command', bootMessage, speed);
  finalizeLine('current-command');

  await typeWriter('current-command', introLine, speed);
  finalizeLine('current-command');

  await typeWriter('current-command', learningLine, speed);
  // For the last line, we don't call finalizeLine, so it stays on the "active" command line with the cursor.
}

document.addEventListener('DOMContentLoaded', init);
