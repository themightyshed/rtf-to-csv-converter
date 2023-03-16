# RTF to CSV Converter

This repository contains a simple web-based tool that converts Rich Text Format (RTF) files containing login details into CSV files. The tool is built using vanilla JavaScript and leverages the [rtf-parser](https://www.npmjs.com/package/rtf-parser) and [PapaParse](https://www.npmjs.com/package/papaparse) libraries for parsing RTF and generating CSV files, respectively.

## Features

- Drag and drop or file input for uploading RTF files
- Extracts login details (account, username, password, extra username, and note) from RTF files
- Generates a CSV file containing the extracted login details
- Downloadable CSV file for easy use and import into other applications

## Usage

Visit the [RTF to CSV Converter](https://themightyshed.github.io/rtf-to-csv-converter/) web page and follow the on-screen instructions:

1.  Drag and drop your RTF file containing login details onto the designated area or click on the area to open the file picker dialog and choose your file.
2.  The tool will automatically parse the RTF file, extract login details, and generate a CSV file.
3.  Once the CSV file is generated, your browser will prompt you to download the file named `output.csv`.

## Importing CSV into 1Password

To import the generated CSV file into 1Password, follow the instructions provided in the [official 1Password support guide](https://support.1password.com/import-1password-com/).

## Development

To set up the project for local development, follow these steps:

1.  Clone the repository

```
git clone https://github.com/themightyshed/rtf-to-csv-converter.git
```

2.  Navigate to the project directory

```
cd rtf-to-csv-converter
```

3.  Install dependencies

```
npm install
```

4.  Run the development server

```
npm run start
```

This will start a local development server, and you can access the tool in your browser at `http://localhost:1234`.

## Deployment

The project is deployed on GitHub Pages. To deploy your changes, follow these steps:

1.  Build the project

```
npm run build
```

2.  Deploy to GitHub Pages

```
npm run deploy
```

## Contributing

Contributions are welcome! If you find a bug or want to suggest a feature, please create an issue or open a pull request on the GitHub repository.
