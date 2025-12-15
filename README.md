# OpenAPI Data 🚀
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com//openapidata/openapidata.github.io/blob/main/LICENSE) &nbsp;&nbsp; [![GitHub stars](https://img.shields.io/github/stars//openapidata/openapidata.github.io?style=social)](https://github.com//openapidata/openapidata.github.io/stargazers) &nbsp;&nbsp; [![GitHub forks](https://img.shields.io/github/forks//openapidata/openapidata.github.io?style=social)](https://github.com//openapidata/openapidata.github.io/network/members) &nbsp;&nbsp; [![GitHub watchers](https://img.shields.io/github/watchers//openapidata/openapidata.github.io?style=social)](https://github.com//openapidata/openapidata.github.io/watchers) &nbsp;&nbsp; [![GitHub followers](https://img.shields.io/github/followers/openapidata?style=social)](https://github.com/openapidata?tab=followers)


**OpenAPI Data** is a free, open-source mock data API for developers. It provides realistic prototyping data in multiple formats (**JSON, XML, CSV, YAML, NDJSON, BSON**) and includes a simulated **GraphQL** playground.

Hosted statically on **GitHub Pages** for infinite scalability, zero latency, and 100% uptime.

🔗 **Live URL:** [https://openapidata.github.io](https://openapidata.github.io "null")

## ✨ Features

*   **Multi-Format Support:** Get the same data in `.json`, `.xml`, `.csv`, `.yaml`, `.ndjson`, and `.bson`.
    
*   **No Authentication:** Publicly accessible. No API keys or tokens required.
    
*   **CORS Enabled:** Works seamlessly from any frontend application.
    
*   **GraphQL Support:** Includes a client-side GraphQL schema and playground.
    
*   **Production Ready:** Massive datasets generated using Faker.js.
    

## 🚀 Quick Start

You can fetch data using any HTTP client.

### JavaScript (Fetch)

```
fetch('https://openapidata.github.io/api/v1/users.json')
  .then(response => response.json())
  .then(data => console.log(data));
```

### cURL

```
curl https://openapidata.github.io/api/v1/users.xml
```

### Python

```
import requests
data = requests.get('https://openapidata.github.io/api/v1/users.csv').text()
print(data)
```

## 📚 Resources

All resources are available under the `/api/v1/` path.

| Resource | Description | Count |
| --- | --- | --- |
| `/users` | User profiles with address, company, and contact info | 100 |
| `/posts` | Social media posts linked to users | 500 |
| `/comments` | Comments attached to posts | 2000 |
| `/todos` | Task items with completion status | 300 |
| `/photos` | Album photos with thumbnails | 500 |

**Supported Extensions:** `.json`, `.min.json`, `.xml`, `.csv`, `.yaml`, `.ndjson`, `.bson`

## 🛠 Local Development

Want to contribute or run your own instance?

1.  **Clone the repository**
    
    ```
    git clone https://github.com/openapidata/openapidata.github.io.git
    cd openapidata.github.io
    ```
    
2.  **Install dependencies**
    
    ```
    npm install
    ```
    
3.  **Run the development server**
    
    ```
    npm run dev
    ```
    
    Open [http://localhost:3000](http://localhost:3000 "null") with your browser.
    
4.  **Generate Data Manually** To regenerate the static API files in `public/api/v1/`:
    
    ```
    node scripts/generate-data.js
    ```
    

## 🏗 Deployment

This project uses **GitHub Actions** to automatically generate data and deploy to GitHub Pages.

1.  Push to `main`.
    
2.  The workflow in `.github/workflows/deploy.yml` triggers.
    
3.  Data is generated via `scripts/generate-data.js`.
    
4.  Next.js builds the static site.
    
5.  Artifacts are deployed to the `gh-pages` environment.
    

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE "null") file for details.