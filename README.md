# **API for Buicorporation's take‐home test Software Engineer**
For French documentation :[https://github.com/AzizProg/bui-api/blob/main/README.fr.md](https://github.com/AzizProg/bui-api/blob/main/README.fr.md) [![Français](https://img.shields.io/badge/lang-Français-blue.svg)](README.fr.md)
#
J'ai réalisé trois tâches pour le test technique de Software Engineer de BuiCorporation, (backend, frontend et mobile) dont chacun dans un repository different. Celui ci étant le repo de la tâche Backend.

# What was required
- Implement at least one endpoint (/transactions) that accepts HTTP requests (POST, GET, PUT, and DELETE).
- Dockerize the project by creating two files (Dockerfile and docker-compose.yml).
 
## Tools used
- TypeScript and the NestJs Framework
- PostgreSQL as the database
- Prisma ORM for database communication
- Docker for dependency isolation and deployment ease


## What I accomplished
- CRUD (Create, Read, Update, Delete) on the endpoint (/transactions)
- Tried to apply Domain Driven Design architecture to the project
- Dockerized the application as required

## Bonus
In addition to the requirements, I added some points to show my strong motivation 🔥 for the position within the company.

- An endpoint for Wallet users to manage their registration and login from the mobile app with Dart/Flutter
- A module for collaborators to monitor Wallet users and their transactions.
- Each part of this project is divided into modules.
- Use of JWT for authentication of collaborators and Wallet users
- API documentation with Swagger
- A Postman collection available for endpoint testing

# Project Structure
This project is divided into two modules:

Bui-collaborators
Bui-wallet
Both projects have the same structure:
```
├── Core
│   ├── Domain
│   │   ├── Entities/ Represent domain business entities (for example, BuiWalletTransactionsEntity, BuiWalletCustomersEntity)
│   │   │
│   │   └── Ports/ Defines the domain's input and output interfaces (for example: ITransactionRepository)
│   │
│   └── Application
│       ├── Use Cases/ Orchestrates the domain use cases (for example, CreateTransactionUseCase, UpdateTransactionUseCase)
│ 
├── Infrastructure
│   ├── Database: Defines data access interfaces (for example: IWalletDatabase)
│   │    │
│   │    └── Prisma/ Implements the defined interfaces (for example: WalletPrismaService)
│   │
│   └── Adapters: Adapts ports to meet demand (for example: TransactionRepositoryImpl, CustomerRepositoryImpl)
│
├── Interface
│   ├── controllers/ Intercepts HTTP requests from the outside (for example: TransactionController, CustomerController)
│   │
│   └── dto/ Ensures reliability of received data and its transfer (for example: CreateTransactionDto, CreateCustomerDto)
│
└── Shared
    └── Exceptions: Defines custom exceptions (for example: DatabaseException, AuthenticationException)
        │
        └── prisma-client-exception/ Manages most exceptions with Prisma

```

# Installation
### Step 1:
- Get (git clone or just download) this repository.
- Install Docker on your computer.
- Open the project in an IDE.

### Step 2:
Create a .env file at the root of the project and define the environment variables below.
```
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@database:5432/${POSTGRES_DB}?schema=public
POSTGRES_USER=postgres 
POSTGRES_PASSWORD=postgres
POSTGRES_DB=buidb
JWT_SECRET="test"
JWT_EXPIRE="10m"
```
_**NB**: Make sure you have created the **.env** file and defined the environment variables or simply use the one I intentionally left at the root of the project containing the already defined variables, otherwise the application startup process will not work._

# Usage
### Step 1: Launch the project
In your IDE terminal, run the command below to launch the project with Docker:
```
docker-compose up --build
```
### Step 2: Access the API documentation (Optional)
Open your browser and type: localhost:3001/api-docs

NB: This only works if you have not changed or the port is not occupied by another service.

You can also find the collection for API testing on Postman at the root of the project under the name:  [Bui-test.postman_collection.json](https://github.com/AzizProg/bui-api/blob/main/Bui-test.postman_collection.json)

(![Capture d'écran 2024-06-11 151331](https://github.com/AzizProg/bui-api/assets/112016586/3150b873-c581-41e4-8fad-46a4fe407717))
To enter the JWT token::
(![Capture d'écran 2024-06-11 151502](https://github.com/AzizProg/bui-api/assets/112016586/58ac0955-58a4-4cd3-acdb-e9df2d500143))
(![Capture d'écran 2024-06-11 151355](https://github.com/AzizProg/bui-api/assets/112016586/33468b3c-f10d-43de-88ac-33aa1bd3dbb8))
Validation schemas:
( ![Capture d'écran 2024-06-11 151442](https://github.com/AzizProg/bui-api/assets/112016586/e3e9e6b2-3cd4-447f-bcc2-7508be7b3434))

### Step 3: View the database with Prisma Studio (Optional)
You can see changes and others in the database by running Prisma Studio in your IDE console:

First, get the container-id of bui_test_api:
```
docker ps
```
Then: :
```
docker exec -t container-id npx prisma studio
```
Example: if the container id is 12345678
```
docker exec -t 12345678 npx prisma studio
```

# Challenges


## Docker
Not being accustomed to Docker, I had to update myself and during the project realization, I faced an issue of communication between my containers (bui-api and bui-client). Being two different projects that are not in the same container, I had difficulty understanding why they were not communicating normally at first, and in the end, I realized that I was still using "localhost" which is normally no longer useful in this case since my containers are each in a virtual environment and at each construction of my containers, a random address is issued by Docker which prevents me from relying on their IPv4 addresses. So I dug to solve the problem and in the end, I had to create a Docker.

