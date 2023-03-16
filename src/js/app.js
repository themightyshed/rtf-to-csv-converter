import rtfParser from 'rtf-parser';
import Papa from 'papaparse';

function convertToPlainText(doc) {
  let plainText = '';

  doc.content.forEach((paragraph) => {
    paragraph.content.forEach((span) => {
      plainText += span.value;
    });
    plainText += '\n';
  });

  return plainText;
}

function rtfToText(rtf) {
  return new Promise((resolve, reject) => {
    const errorHandler = (err) => reject(err);
    rtfParser.string(rtf, (err, doc) => {
      if (err) {
        errorHandler(err);
      } else {
        const plainText = convertToPlainText(doc);
        resolve(plainText);
      }
    });
  });
}

function parseLoginDetails(text) {
  const lines = text.split('\n').filter((line) => line.trim() !== ''); // Filter out blank lines
  const loginDetails = [];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  for (let i = 0; i < lines.length; i++) {
    const account = lines[i].trim();
    let username = lines[++i]?.trim();
    let extraUsername = '';
    let note = '';

    // Check if the next line is a note
    if (username.startsWith('(')) {
      const noteMatch = username.match(/\((.*?)\)/);
      if (noteMatch) {
        note = noteMatch[1];
      }
      username = lines[++i]?.trim();
    }

    // If the next line is an email address, store it as an extra username
    if (emailRegex.test(lines[i + 1]?.trim())) {
      extraUsername = lines[++i]?.trim();
    }

    const password = lines[++i]?.trim();

    if (account && username && password) {
      const loginDetail = { account, username, password };
      if (extraUsername) {
        loginDetail.extraUsername = extraUsername;
      }
      if (note) {
        loginDetail.note = note;
      }
      loginDetails.push(loginDetail);
    }
  }

  return loginDetails;
}

const fileInput = document.getElementById('rtf-file');
const dropZone = document.getElementById('drop-zone');

// Add drag and drop event listeners
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.stopPropagation();
  dropZone.classList.add('is-dragover');
});

dropZone.addEventListener('dragleave', (e) => {
  e.preventDefault();
  e.stopPropagation();
  dropZone.classList.remove('is-dragover');
});

dropZone.addEventListener('drop', async (e) => {
  e.preventDefault();
  e.stopPropagation();
  dropZone.classList.remove('is-dragover');

  const file = e.dataTransfer.files[0];
  if (!file) return;

  fileInput.files = e.dataTransfer.files;

  await processFile(file);
});

fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  await processFile(file);
});

async function processFile(file) {
  // Process the file here
  console.log('File selected:', file.name);

  try {
    const rtf = await file.text();
    console.log('RTF content:', rtf);
    const text = await rtfToText(rtf);
    console.log('Plain text:', text);
    const loginDetails = parseLoginDetails(text);
    console.log('Parsed login details:', loginDetails);

    const csvContent = Papa.unparse(loginDetails);
    console.log('CSV content:', csvContent);
    const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);

    const link = document.createElement('a');
    link.href = csvUrl;
    link.download = 'output.csv';
    link.click();
  } catch (error) {
    console.error(error);
    alert('Error processing file. Please try again.');
  }
}
