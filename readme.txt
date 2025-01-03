# Star Kinoko member manager

Hey y'all! Atlas here. So you're probably wondering "WHAT THE FUCK IS THIS?!" And honestly, when an Internet person sends you a ZIP directory, I can't blame you.
Basically, this is a mini web app for managing members.
Why?
Because I wanted to.
However, the dependencies do require a little "oomph" and I'm a terrible teacher. So I had ChatGPT generated some instructions for me! Yay AI!
Peace.

## How to Use This Web App (shit that comes in your OS)

### Windows

1. Click on the Windows Search Icon (magnifying glass) in the taskbar.
2. Type `PowerShell` and press Enter to open PowerShell.
3. Navigate to the folder containing the web app files:
-- Use the command: `cd path\to\your\folder` (replace `path\to\your\folder` with the actual path to your folder).
4. Start the HTTP server:
-- Type the following command and press Enter: `Add-Type -AssemblyName System.Web; $listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:8000/'); $listener.Start(); while ($listener.IsListening) { Start-Sleep -Seconds 1 }`
5. Open your browser and go to `http://localhost:8000` to access the app.

### Mac

See Python because Apple sucks.

## How to Use This Web App (Python)

If you're comfortable using Python or already have it installed, you can use this local host method.

### Windows

1. Click on the Windows Search Icon (magnifying glass) in the taskbar.
2. Type cmd and press Enter to open the Command Prompt.
3. Check if Python is installed:
-- Type `python --version` and press Enter.
-- If you see a version number, proceed to the next step. If not, download and install Python from python.org.
4. Navigate to the folder containing the web app files:
-- Type `cd path\to\your\folder` (replace `path\to\your\folder` with the actual path to your folder) and press Enter.
5. Start the HTTP server:
-- Type `python -m http.server` and press Enter.
6. Open your browser and go to http://localhost:8000 to access the app.

### Mac

1. Open Terminal:
-- Press `Command + Space` to open Spotlight Search.
-- Type Terminal and press Enter.
2. Check if Python is installed:
-- Type `python3 --version` and press Enter.
-- If you see a version number, proceed to the next step. If not, download and install Python from python.org.
3. Navigate to the folder containing the web app files:
- Type `cd /path/to/your/folder` (replace `/path/to/your/folder` with the actual path to your folder) and press Enter.
4. Start the HTTP server:
-- Type `python3 -m http.server` and press Enter.
5. Open your browser and go to http://localhost:8000 to access the app.

## How This Works

### Overview

This web app manages members using two tables: Active Members and Retired Members.
It relies on your browser's IndexedDB, a built-in database that stores data locally.
This means changes you make to the data will persist even after you close and reopen the browser, as long as you access the app from the same browser and device.

### Features

1. Add Members:
-- Click the "Add Member" button.
-- Fill in the details in the pop-up modal.
-- Click "Save" to add the member to the Active Members table.
2. Edit Members:
-- Click "Edit" in the Manage column of the respective table.
-- Update the fields in the modal.
-- Click "Save" to update the entry.
3. Retire Members:
-- Click "Retire" in the Manage column of the Active Members table.
-- The member will move to the Retired Members table.
4. Reinstate Members:
-- Click "Reinstate" in the Manage column of the Retired Members table.
-- The member will move back to the Active Members table.
5. Delete Members:
-- Click "Delete" in the Manage column of either table.
-- Confirm the deletion in the pop-up modal.

### IndexedDB
- What is IndexedDB?: A local database stored in your browser.
- Why is it used?: To save changes locally and ensure data persists even after closing the browser.
- Limitations: The data is tied to your specific browser and device.