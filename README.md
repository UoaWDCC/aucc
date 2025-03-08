# AUCC Website


## Auckland University Canoe Club Website

This repository contains the source code for the Auckland University Canoe Club website. The site is built using Payload CMS.

## Setup & Installation

### Prerequisites

- Node.js (version 22.14 recommended)
- pnpm v10.5.2

### Setting Up the Repository

1. Clone the repository:
    ```bash
    git clone https://github.com/UoaWDCC/aucc.git
    cd aucc
    ```

2. Install dependencies:
    ```bash
    pnpm install
    ```

3. Create environment configuration:
    ```bash
    cp .env.example .env
    ```
    Populate the ENV with the relevant values

## Local Development

1. Start the PostgreSQL database:
    ```bash
    docker compose up -d
    ```

2. Start the development server:
    ```bash
    pnpm dev
    ```

3. Access the website:
    - Frontend: http://localhost:3000
    - Payload CMS Admin: http://localhost:3000/admin
