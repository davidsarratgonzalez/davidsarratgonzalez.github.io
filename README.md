# My personal website

This project showcases my professional experience, education, projects, publications, and more in a minimalistic and responsive design. The website is built using React and is optimized for both desktop and mobile devices.

## Features

- **Minimalistic design**: Clean and simple layout to highlight the most important information.
- **Responsive**: Fully responsive design that works seamlessly on both desktop and mobile devices.
- **Easy to update**: All the information displayed on the website can be easily modified through JSON files located in the `src/data` directory.

## Demo

You can view the live demo of the website [here](https://davidsarratgonzalez.github.io).

## Getting started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/davidsarratgonzalez/davidsarratgonzalez.github.io.git
    cd davidsarratgonzalez.github.io
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

### Running the development server

To start the development server, run:

```bash
npm start
```

This will start the React development server and open the website in your default browser. Any changes you make to the code will automatically reload the page.

### Building for production

To create a production build of the website, run:

```bash
npm run build
```

This will generate a `build` directory with the optimized production files.

### Deploying to GitHub Pages

This project is configured to deploy directly to GitHub Pages. To deploy the website, run:

```bash
npm run deploy
```

This will build the project and push the contents of the `build` directory to the `gh-pages` branch of your repository.

## Modifying the content

All the content displayed on the website can be modified through JSON files located in the `src/data` directory. Simply update the relevant JSON file with your information, and the website will reflect the changes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## Acknowledgements

- Built with [React](https://reactjs.org/)
- Deployed using [GitHub Pages](https://pages.github.com/)
