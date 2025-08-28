# Color Palette Extension

Chrome Extension that aims to help developers and designers when finding colors online. It uses JavaScript's EyeDropper API to select the color of any pixel on screen and get its HEX value. It also includes several features relevant to finding color values, including a selection history and custom palette options.

## Features

- See history of all color selections made by the eyedropper
- Create custom palettes, which are stored in the browser's local storage, and add any selected color to any custom palette
- Options to edit selection history (copy, delete) and palettes (rename, delete)

### Upcoming Features:

- RGB values
- Copy palettes (or all colors of a palette) as a string/text
- Toggle palettes on/off

## Tools Used

HTML, CSS, JavaScript, EyeDropper API, Bootstrap Icons

## Design

[Figma](https://www.figma.com/design/HdEJOj95lB3Sd9QwLlwmPn/color-palette?node-id=0-1&t=AzAnEXZjsIkq0efJ-1)

## Installation

### Load the Unpacked Extension in Chrome

1. **Download the Extension Files**

   - Clone this repository to your local machine

2. **Go to Chrome Extensions**

   - Visit `chrome://extensions/` OR Menu (⋮) → Extensions → Manage Extensions in Google Chrome

3. **Enable Developer Mode**

   - Toggle the "Developer mode" switch in the top-left corner of the extensions page

4. **Load the Extension**

   - Click "Load unpacked"
   - Select the cloned "colorpick" folder

5. **Verify Installation**
   - The extension should now appear in your extensions list
   - Turn the extension on/off with the toggle button
   - To use, click the ColorPick icon under Extensions, located to the right of the search bar
