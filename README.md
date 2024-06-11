J'ai réalisé trois tâches pour le test technique de Software Engineer de BuiCorporation, (backend, frontend et mobile) dont chacun dans un repository different. Celui ci étant le repo de la tâche Backend.

# Description
## Ce qui m'a été demandé
- Implémenter au moins un point de terminaison (/transactions) qui  accepte les requêtes HTTP (POST, GET, PUT et DELETE)
- Dockeriser le projet en créant deux fichiers ( Dockerfile et docker-compose.yml)
 
## Outils utilisés
- le langage TypeScript et le Framework NestJs
- PostgreSQL comme base de donnée
- L'ORM Prisma pour faciliter la communication avec la base de donnée
- Docker pour isoler mes dépendances et faciliter son déploiement


## Ce que j'ai réalisé
- CRUD (Create , Read, Update et Delete) sur le point de terminaison (/transactions)
- Essayer d'appliquer l'architecture Domain Driven Design au projet
- Dockeriser l'application comme demandé

## Bonus
 En plus des de ce qui m'a été demandé , j'ai ajouté certains points afin de montrer ma bonne motivation 🔥 pour le post au sein de l'entreprise.
- Un point de terminaison pour les utilisateurs du Wallet pour gérer leurs inscription et connexion depuis l'application mobile avec Dart / Flutter
- Une partie (module) pour les collaborateurs qui pourront surveiller les utilisateurs du Wallet et leurs transactions 
- Chaque partie de ce projet est divisé en module
- Utilisation du JWT pour l'authentification des collaborateurs et utilisateurs du wallet
- Documentation de l'API avec Swagger
- Une collection Postman disponible pour les tests sur les points de terminaison 
- Diagramme de séquence des cas d'utilisations

# Structure du projet 
Ce projet est divisé en deux modules :
- Bui-collaborators
- Bui-wallet

Les deux projets ont la même structure:
```

├── Core
│   ├── Domain
│   │   ├── Entities/ Représentent les entités du domaine métier (par exemple, BuiWalletTransactionsEntity, BuiWalletCustomersEntity)
│   │   │
│   │   └── Ports/ Définit les interfaces d'entrée et de sortie du domaine (par exemple: ITransactionRepoSitory)
│   │
│   └── Application
│       ├── Use Cases/ Orchestre les cas d'utilisation du domaine (par exemple, CreateTransactionUseCase, UpdateTransactionUseCase)
│ 
├── Infrastructure
│   ├── Database: Définit les interfaces  d'accès aux donnée (par exemple: IWalletDatabase)
│   │    │
│   │    └── Prisma/  Implémente les interfaces défini (par exemple: WalletPrismaService)
│   │
│   └── Adapters: Adaptent les ports pour répondre à la demande(par exemple: TransactionRepositoryImpl , 
│                 CustomerRepositoryImpl)
│
├── Interface
│   ├── controllers/ Intercepte les requêtes Http venant de l'exterieur  (par exemple: TransactionController, CustomerController)
│   │
│   └── dto/ Assure la fiabilité des données reçus et de leurs transfert  (par exemple: CreateTransactionDto , CreateCustomerDto)
│
└── Shared
    └── Exceptions: Définit les exceptions personnalisées (par exemple: DatabaseException, AuthenticationException)
        │
        └── prisma-client-exception/ gère la majorité des exceptions avec prisma
```

# Installation
### Etape 1:
- Récupérer ce repository
- Installer docker sur votre ordinateur
- Ouvrir le projet sur un IDE

### Etape 2:
Créer un fichier **.env** à la racine du projet et définissez les variables d'environnements ci-dessous.
```
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@database:5432/${POSTGRES_DB}?schema=public
POSTGRES_USER=postgres 
POSTGRES_PASSWORD=postgres
POSTGRES_DB=buidb
JWT_SECRET="test"
JWT_EXPIRE="10m"
```
_**NB**: Assurez vous d'avoir créer le fichier **.env** et defini les variables d'environnements sinon le processus de demarrage de l'application ne fonctionnera pas._

# Utilisation
### Etape 1:Lancez le projet
Dans le terminal de votre IDE, executez la commande ci-dessous pour lancer le projet avec docker:
```
docker-compose up --build
```
### Etape 2:Acceder à la documentation de l'api (Facultative)
Aller dans votre navigateur et tapez : **localhost:3000/api-docs**

NB: Ceci marche uniquement si vous n'avez pas changé ou que le port ne soit pas occupé par un autre service

Vous pouvez trouvez également la collection pour les tests d'api sur Postman a la racine du projet au nom: Bui-Wallet-api-collection

### Etape 3:Visualiser la base de donnée avec Prisma Studio(Facultative)
Vous pouvez voir les modifications et autres dans la base de donnée en exécutant Prisma studio dans la console de votre IDE :

Obtenez d'abord le container-id de bui_test_api:
```
docker ps
```
Ensuite :
```
docker exec -t container-id npx prisma
```

