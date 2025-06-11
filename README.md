# 📝 Form Builder

A modern, responsive React application for building and sending custom HTTP requests — inspired by Postman. This project allows you to manage Params, Headers, Auth, and JSON body content with live validation, using a clean Tailwind CSS-powered UI.


## 📦 Tech Stack

- ⚛️ **React** (with Vite)
- 🔐 **TypeScript**
- 🎨 **Tailwind CSS**
- 📬 Custom Request Builder UI (GET, POST, PUT, PATCH, DELETE)
- 📖 JSON body editor with live validation
- 📄 Dynamic Params, Headers, Auth tables with bulk edit support


## 🚀 Getting Started

### 1️⃣ Install dependencies

```bash
npm install
# or
yarn
2️⃣ Start development server
bash
Copy
Edit
npm run dev
# or
yarn dev
Open http://localhost:5173 in your browser.

🗂️ Project Structure
arduino
Copy
Edit
form-builder/
├── public/
├── src/
│   ├── components/
│   │   ├── jsonBodyEditor.tsx
│   │   ├── jsonViewer.tsx
│   │   ├── keyValueTable.tsx
│   │   ├── requestLine.tsx
│   │   └── requestTabs.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── README.md
🎨 Features
✅ HTTP method selection (GET, POST, PUT, PATCH, DELETE)
✅ URL input with Send button
✅ Tabbed Params, Headers, Auth, and Body sections
✅ Dynamic key-value pair tables with add/remove/delete
✅ Bulk Edit support for Params/Headers/Auth
✅ JSON body editor with real-time validation
✅ Fully responsive and mobile-friendly UI

📸 Preview
Replace this section with a screenshot or GIF of your app when deployed!

📑 License
This project is open-source and free to use under the MIT License.

🙌 Acknowledgements
Inspired by tools like Postman and Insomnia.

✨ Contributions
Feel free to fork this repo, open issues or submit PRs — contributions are welcome!
