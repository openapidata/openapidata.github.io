# Contributing to OpenAPI Data

First off, thank you for considering contributing to OpenAPI Data! It's people like you that make the open-source community such an amazing place to learn, inspire, and create.

## 🤝 How Can I Contribute?

### 1\. Adding New Data Resources

We use `@faker-js/faker` to generate our datasets. To add a new resource (e.g., `products` or `orders`):

1.  Open `scripts/generate-data.js`.
    
2.  Create a new generation function (e.g., `generateProducts`).
    
3.  Add the generation call to the `main()` function.
    
4.  Run `node scripts/generate-data.js` to test if the files are created in `public/api/v1/`.
    

### 2\. Improving the Documentation Site

The website is built with **Next.js 14** and **Tailwind CSS**.

*   The main UI code is in `app/page.jsx`.
    
*   Components and styling improvements are always welcome.
    

### 3\. Reporting Bugs

If you find a bug in the data generation or the website, please open an issue on GitHub.

## 🛠 Development Workflow

1.  **Fork the repository** on GitHub.
    
2.  **Clone your fork** locally.
    
    ```
    git clone [https://github.com/your-username/openapidata.github.io.git](https://github.com/your-username/openapidata.github.io.git)
    ```
    
3.  **Create a branch** for your feature.
    
    ```
    git checkout -b feature/amazing-new-resource
    ```
    
4.  **Install dependencies**.
    
    ```
    npm install
    ```
    
5.  **Make your changes**.
    
6.  **Test your changes**.
    
    ```
    node scripts/generate-data.js
    npm run dev
    ```
    
7.  **Commit and Push**.
    
    ```
    git commit -m "Add amazing new resource"
    git push origin feature/amazing-new-resource
    ```
    
8.  **Open a Pull Request** on the main repository.
    

## 💎 Code Style

*   Please ensure your code is clean and formatted.
    
*   If modifying the generator, ensure no sensitive or real data is ever used (use Faker.js only).