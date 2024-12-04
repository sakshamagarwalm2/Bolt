# Bolt The Website Creator
## Overview:
Bolt The Website Creator is an AI-powered web application that can generate code for websites using React or Node.js, based on user prompts. It was inspired by the popular Bolt.new platform.

<a >
      <img src="https://github.com/sakshamagarwalm2/Bolt/blob/main/public/Screenshot%202024-12-04%20123058.png" alt="Project Banner">
    </a>

## Key Features:
- #### AI-Powered Website Generation:
  *  Bolt leverages a powerful language model, LLaMA3-GROQ-8B-8192, and GROQ API to generate custom website code based on user prompts.
  * The LLaMA3-GROQ-8B-8192 model is a large language model based on the LLaMA architecture, fine-tuned on the GROQ query language. This model provides Bolt with the ability to understand and generate GROQ code, which is used to query and manipulate data in the Bolt application.
  * The GPT wrapper allows Bolt to utilize the capabilities of large language models like LLaMA3-GROQ-8B-8192 to generate and refine the website code based on user prompts.
  * [GORQ](https://groq.com/)

 - React and Node.js Support: The application can create websites using either React or Node.js, allowing users to choose their preferred technology stack.
 - Web-Based Preview: Bolt includes a web container that allows users to preview the generated website directly within the application. The web container is a self-contained environment that runs the generated website code, providing a seamless user experience.
 - Intuitive User Interface: The application features a clean and user-friendly interface, making it easy for users to describe their desired website and generate the corresponding code.

## Project Structure:
- Backend: The project includes a backend directory, which likely contains the server-side code, API endpoints, and other server-related functionality.[be](be)
- Frontend: The frontend directory contains the client-side code, including React components, styles, and other user interface-related files.[frontend](frontend)

## Getting Started:
- Clone the repository:
  ```javascript
  https://github.com/sakshamagarwalm2/Bolt.git
- Navigate to the project directory:
  ```javascript
  cd Bolt
- Install the required dependencies in Backend:
  ```javascript
  cd ./be/
  npm i
- Install the required dependencies in Frontend:
  ```javascript
  cd ./frontend/
  npm i
 - Run Frontend and Backend:
   ```javascript
   npm run dev

## Usage:
- In the main interface, describe the website you want to create in the provided text field.
- Click the "Generate Website Plan" button to initiate the code generation process.
- Review the generated code in the file explorer and the live preview of the website.
- If you're satisfied with the results, you can download the generated code or continue to refine your prompts.
<a >
      <img src="https://github.com/sakshamagarwalm2/Bolt/blob/main/public/Screenshot%202024-12-04%20122840.png" alt="Project Banner">
    </a>

    
## Contributing
Contributions to Bolt The Website Creator are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request. We appreciate your feedback and support.


## License
Bolt The Website Creator is licensed under the MIT License.
