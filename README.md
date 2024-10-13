<h1>Sinhala-English Translator</h1>

<p>
  The <strong>Sinhala-English Translator</strong> is a web-based application that allows users to translate between Sinhala and English with ease. It provides features like translation history, edit and delete options for translations, and the ability to generate PDF reports of recent translations.
</p>

<h2>Features</h2>
<ul>
  <li><strong>Translate Sinhala to English</strong> and <strong>English to Sinhala</strong> using the Microsoft Translator API.</li>
  <li><strong>View translation history</strong>: Users can see a list of all recent translations.</li>
  <li><strong>Edit and delete translations</strong>: Users can update or delete translations directly from the app.</li>
  <li><strong>PDF Report Generation</strong>: Generate a PDF report containing the last 15 translations, with support for Sinhala font in the PDF.</li>
</ul>

<h2>Screenshots</h2>

![image](https://github.com/user-attachments/assets/5c80b92e-c89b-4807-9ef3-7d17751ee3c3)

![image](https://github.com/user-attachments/assets/c9fe822c-627f-4165-8241-1ee10d1c3e1a)

![image](https://github.com/user-attachments/assets/a95cf441-705c-4bf6-b169-4f35ec530ee7)





<h2>Installation</h2>

<h3>Prerequisites</h3>
<ul>
  <li>Node.js and npm</li>
  <li>MongoDB installed and running locally or on a cloud service</li>
  <li>Microsoft Translator API credentials (You’ll need an API key from <a href="https://www.microsoft.com/en-us/translator/">Microsoft Translator</a>)</li>
</ul>

<h3>Backend Setup</h3>
<ol>
  <li>Clone the repository:
    <pre><code>git clone https://github.com/your-username/sinhala-english-translator.git
cd sinhala-english-translator/backend
    </code></pre>
  </li>
  <li>Install dependencies:
    <pre><code>npm install</code></pre>
  </li>
  <li>Set up environment variables by creating a <code>.env</code> file in the backend directory:
    <pre><code>MONGO_URI=your-mongodb-uri
TRANSLATOR_API_KEY=your-microsoft-translator-api-key
TRANSLATOR_API_REGION=your-microsoft-translator-api-region
PORT=5000
    </code></pre>
  </li>
  <li>Start the backend server:
    <pre><code>npm start</code></pre>
  </li>
</ol>

<h3>Frontend Setup</h3>
<ol>
  <li>Navigate to the frontend directory:
    <pre><code>cd ../frontend</code></pre>
  </li>
  <li>Install dependencies:
    <pre><code>npm install</code></pre>
  </li>
  <li>Start the frontend development server:
    <pre><code>npm start</code></pre>
  </li>
</ol>

<p>The application should now be running at <code>http://localhost:3000</code>.</p>

<h2>Usage</h2>
<ol>
  <li>Enter a text in Sinhala or English.</li>
  <li>Click the "Translate" button to get the translation.</li>
  <li>View the list of previous translations.</li>
  <li>Use the <strong>Edit</strong> and <strong>Delete</strong> options for each translation.</li>
  <li>Generate a PDF report of your last 15 translations.</li>
</ol>

<h2>Technologies Used</h2>
<ul>
  <li><strong>Frontend</strong>: React, HTML, CSS</li>
  <li><strong>Backend</strong>: Node.js, Express</li>
  <li><strong>Database</strong>: MongoDB</li>
  <li><strong>API</strong>: Microsoft Translator API</li>
  <li><strong>PDF Generation</strong>: jsPDF, jsPDF-AutoTable</li>
</ul>

<h2>Future Enhancements</h2>
<ul>
  <li><strong>User Authentication</strong>: Only logged-in users can access certain features.</li>
  <li><strong>Premium Features</strong>: Offer additional services like saving favorite translations or custom word suggestions.</li>
</ul>

<h2>Contributing</h2>
<p>Contributions are welcome! If you find any bugs or want to add features, feel free to open an issue or submit a pull request.</p>

<h2>License</h2>
<p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

<h2>Contact</h2>
<p>For any questions or inquiries, contact me at <a href="mailto:shenorikaushalya209@gmail.com">shenorikaushalya209@gmail.com</a>.</p>
