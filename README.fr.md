# **Documentation du projet Api pour le test d'ingénieur logiciel chez BUICOROPRATION**
For this documentation in English:[![English](https://img.shields.io/badge/lang-English-blue.svg)](README.md)
#
J'ai réalisé trois tâches pour le test technique de Software Engineer de BuiCorporation (backend, frontend et mobile), chacune dans un repository différent. Celui-ci est le repo de la tâche Backend.
Pour consulter les autres parties::
* [Frontend avec Next Js](https://github.com/AzizProg/bui-client)
* [Mobile avec Flutter](https://github.com/AzizProg/bui-api)
---
# Description

## Ce qui m'a été demandé

- Implémenter au moins un point de terminaison (/transactions) qui accepte les requêtes HTTP (POST, GET, PUT et DELETE).
- Dockeriser le projet en créant deux fichiers (Dockerfile et docker-compose.yml).
 
## Outils utilisés

- Le langage TypeScript et le framework NestJs.
- PostgreSQL comme base de données.
- L'ORM Prisma pour faciliter la communication avec la base de données.
- Docker pour isoler mes dépendances et faciliter le déploiement.


## Ce que j'ai réalisé

- CRUD (Create, Read, Update et Delete) sur le point de terminaison (/transactions).
- Essayer d'appliquer l'architecture Domain Driven Design au projet.
- Dockeriser l'application comme demandé.
---
## Bonus
En plus de ce qui m'a été demandé, j'ai ajouté certains points afin de montrer ma motivation 🔥 pour le poste au sein de l'entreprise.

- Un point de terminaison pour les utilisateurs du Wallet pour gérer leur inscription et connexion depuis l'application mobile avec Dart/Flutter.
- Une partie (module) pour les collaborateurs qui peuvent surveiller les utilisateurs du Wallet et leurs transactions.
- Chaque partie de ce projet est divisée en modules.
- Utilisation du JWT pour l'authentification des collaborateurs et des utilisateurs du Wallet.
- Documentation de l'API avec Swagger.
- Une collection Postman disponible pour les tests sur les points de terminaison.
---
# Structure du projet
Ce projet est divisé en deux modules :

Bui-collaborators
Bui-wallet
Les deux projets ont la même structure :
```
├── Core
│   ├── Domain
│   │   ├── Entities/ Représentent les entités du domaine métier (par exemple, BuiWalletTransactionsEntity, BuiWalletCustomersEntity)
│   │   │
│   │   └── Ports/ Définit les interfaces d'entrée et de sortie du domaine (par exemple : ITransactionRepository)
│   │
│   └── Application
│       ├── Use Cases/ Orchestre les cas d'utilisation du domaine (par exemple, CreateTransactionUseCase, UpdateTransactionUseCase)
│ 
├── Infrastructure
│   ├── Database: Définit les interfaces d'accès aux données (par exemple : IWalletDatabase)
│   │    │
│   │    └── Prisma/ Implémente les interfaces définies (par exemple : WalletPrismaService)
│   │
│   └── Adapters: Adaptent les ports pour répondre à la demande (par exemple : TransactionRepositoryImpl, CustomerRepositoryImpl)
│
├── Interface
│   ├── controllers/ Intercepte les requêtes HTTP venant de l'extérieur (par exemple : TransactionController, CustomerController)
│   │
│   └── dto/ Assure la fiabilité des données reçues et leur transfert (par exemple : CreateTransactionDto, CreateCustomerDto)
│
└── Shared
    └── Exceptions: Définit les exceptions personnalisées (par exemple : DatabaseException, AuthenticationException)
        │
        └── prisma-client-exception/ Gère la majorité des exceptions avec Prisma

```
---
# Installation
### Étape 1 :
- Récupérer ce repository.
- Installer Docker sur votre ordinateur.
- Ouvrir le projet dans un IDE.

### Étape 2 :
Créer un fichier **.env** à la racine du projet et définir les variables d'environnement ci-dessous.
```
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@database:5432/${POSTGRES_DB}?schema=public
POSTGRES_USER=postgres 
POSTGRES_PASSWORD=postgres
POSTGRES_DB=buidb
JWT_SECRET="test"
JWT_EXPIRE="10m"
```
_**NB **: Assurez-vous d'avoir créé le fichier **.env **et défini les variables d'environnement ou simplement d'utiliser celui que j'ai volontairement laissé à la racine du projet contenant les variables déjà définies, sinon le processus de démarrage de l'application ne fonctionnera pas._
---
# Utilisation
### Étape 1 : Lancez le projet
Dans le terminal de votre IDE, exécutez la commande ci-dessous pour lancer le projet avec Docker :
```
docker-compose up --build
```
### Étape 2 : Accéder à la documentation de l'API (Facultatif)
Ouvrez votre navigateur et tapez : localhost:3001/api-docs

NB : Ceci fonctionne uniquement si vous n'avez pas changé ou que le port n'est pas occupé par un autre service.

Vous pouvez également trouver la collection pour les tests d'API sur Postman à la racine du projet au nom: [Bui-test.postman_collection.json](https://github.com/AzizProg/bui-api/blob/main/Bui-test.postman_collection.json)

(![Capture d'écran 2024-06-11 151331](https://github.com/AzizProg/bui-api/assets/112016586/3150b873-c581-41e4-8fad-46a4fe407717))
Pour saisir le token JWT:
(![Capture d'écran 2024-06-11 151502](https://github.com/AzizProg/bui-api/assets/112016586/58ac0955-58a4-4cd3-acdb-e9df2d500143))
(![Capture d'écran 2024-06-11 151355](https://github.com/AzizProg/bui-api/assets/112016586/33468b3c-f10d-43de-88ac-33aa1bd3dbb8))
Les schémas de validation:
( ![Capture d'écran 2024-06-11 151442](https://github.com/AzizProg/bui-api/assets/112016586/e3e9e6b2-3cd4-447f-bcc2-7508be7b3434))

---
# Prisma Studio: Visualisez le contenu de la base de donnée (Optionel)

## Step 1: Obtenir l'id du container

Dans le terminal de votre IDE:
```
docker ps
```
En suite: :
```
docker exec -t container-id npx prisma studio
```
Exemple: Si le container id est 12345678
```
docker exec -t 12345678 npx prisma studio
```

## Etape 2: Obtenir votre adresse Ipv4

### Windows

```
ipconfig
```
En suite cherchez la ligne Ipv4

### MacOs
Si vous utilisez une connexion 
```
ipconfig getifaddr en0
```
Si vous utilisez une connexion Ethernet
```
ipconfig getifaddr en1
```
## Step 3: Ouvrir prisma studio
Dans votre navigateur, lancez prisma studio avec votre adresse ipv4 et le port defini par default dans le fichier docker compose(5555):
```
ipv4Adress:5555
```
---
# Difficultés rencontrées


## Docker
N'étant pas habitué à Docker, j'ai dû me mettre à jour et pendant la réalisation du projet, je me suis confronté à un souci de communication entre mes conteneurs (bui-api et bui-client). Étant deux projets différents qui ne se trouvent pas dans le même conteneur, j'ai eu du mal à comprendre au début pourquoi ils ne communiquaient pas normalement et à la fin je me suis rendu compte que j'utilisais toujours le "localhost" qui n'est normalement plus utile dans ce cas puisque mes conteneurs se trouvent chacun dans un environnement virtuel et à chaque construction de mes conteneurs une adresse aléatoire est délivrée par Docker ce qui m'empêche de me baser sur leurs adresses IPv4. J'ai donc creusé pour résoudre le problème et à la fin, j'ai dû créer un réseau Docker auquel les deux conteneurs seraient reliés afin qu'ils puissent communiquer avec leur nom de service.



