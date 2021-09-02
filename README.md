# opcua-api-test-gui
A test gui for showing how to connect to the Prediktor OPC UA API

To run this GUI:
1. Download the repository to your local machine;
2. Open the repository in Visual Studio Code or other coding tool;
3. From the command prompt, run "npm install";
4. Run "npm run start";
5. The gui should appear in your browser on http://localhost:3000

The relevant API calls are made in the file \src\screens\OpcUaBrowser\OpcUaBrowser.tsx

These calls are routed through the functions found under \src\functions to the API.