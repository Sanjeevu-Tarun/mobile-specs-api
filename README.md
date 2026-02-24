# GSMArena Scraper API

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)

[Читать на русском](README.ru.md)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/revengernick)

A simple, unofficial REST API to scrape phone specifications and data from GSMArena.com. Built with Fastify and TypeScript for maximum performance and type safety.

This project provides structured JSON data for phone brands, device lists, detailed specifications, and popularity rankings.

## Features

- **No API Key Required:** Open and free to use.
- **Structured JSON Output:** Clean, predictable, and easy-to-use data format.
- **Comprehensive Endpoints:** Get brands, phone lists, detailed specs, latest devices, and top-ranked phones.
- **Fast & Lightweight:** Built on top of Fastify, one of the fastest web frameworks for Node.js.
- **Fully Typed:** Written in TypeScript for a better developer experience.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- pnpm (or npm/yarn)

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your-username/gsmarena-parser-api.git
    cd gsmarena-parser-api
    ```
2.  **Install packages**
    ```sh
    pnpm install
    ```
3.  **Run the development server**
    The server will start on `http://localhost:4000` and automatically restart on file changes.
    ```sh
    pnpm dev
    ```
4.  **For production:**
    ```sh
    pnpm build
    pnpm start
    ```

## API Endpoints

All successful responses are wrapped in a `{ status: true, data: ... }` object.

---

### Brands

- **`GET /brands`**
  - Returns an object of all available brands.
  - **Example:** `http://localhost:4000/brands`

---

### Phone Lists

- **`GET /brands/:brandSlug`**

  - Returns a list of phones for a specific brand.
  - **Example:** `http://localhost:4000/brands/apple-phones-48`

- **`GET /latest`**

  - Returns a list of the latest added devices. The response is wrapped in a `{ title, phones }` object.
  - **Example:** `http://localhost:4000/latest`

- **`GET /top-by-interest`**

  - Returns a ranked list of phones by daily user interest.
  - **Example:** `http://localhost:4000/top-by-interest`

- **`GET /top-by-fans`**
  - Returns a ranked list of phones by the number of fans.
  - **Example:** `http://localhost:4000/top-by-fans`

---

### Search & Details

- **`GET /search?query=:searchQuery`**

  - Returns a list of phones matching the search query.
  - **Example:** `http://localhost:4000/search?query=iPhone 15 Pro`

- **`GET /:slug`**
  - Returns detailed specifications for a specific phone.
  - **Example:** `http://localhost:4000/apple_iphone_15_pro_max-12557`

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` file for more information.

## Disclaimer

This project is for educational purposes only. It is not affiliated with GSMArena.com in any way. Web scraping can be against the terms of service of a website. Please use this project responsibly and respect the terms of service of GSMArena.com. The developer assumes no liability for any misuse of this scraper.
