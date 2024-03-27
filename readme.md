# DibreDiario

## Overview

DibreDiario is a Node.js application designed to provide real-time updates on football matches for a specific day. Leveraging the power of Puppeteer for web scraping, this API retrieves live data on football matches from various sources and presents it in an easy-to-consume format.

## Features

- **Real-time Updates**: Get the latest information on football matches happening on a particular day.
- **Flexible**: Retrieve data for any specified day to keep users up-to-date with ongoing matches.
- **Easy Integration**: Built with Node.js and Express.js, making it easy to integrate with existing applications or frameworks.
- **Reliable Data**: Utilizes Puppeteer for web scraping, ensuring reliable and accurate data retrieval from diverse sources.

## Usage

To use DibreDiario in your project, follow these steps:

1. **Installation**: Clone this repository to your local machine.

    ```bash
    git clone https://github.com/Thiteago/dibrediario.git
    ```

2. **Dependencies**: Navigate to the project directory and install dependencies using npm or yarn.

    ```bash
    cd DibreDiario
    npm install
    ```

3. **Start the Server**: Run the application using Node.js.

    ```bash
    npm run dev
    ```

4. **API Endpoints**:

    - `GET /matches/:date`: Retrieve football matches for the specified date in real-time.

        - Parameters:
            - `date`: Date for which matches are to be retrieved. (Format: `dd-mm-yyyy`)

        - Example:
            ```bash
            curl http://localhost:3000/matches/26-03-2023
            ```

## Dependencies

DibreDiario relies on the following dependencies:

- Node.js
- Express.js
- Puppeteer

Make sure these dependencies are installed before running the application.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute this code as per the terms of the license.

---
