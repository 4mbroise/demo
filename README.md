# Apprentissage par la pratique
On va réaliser une API pour permettant de gérer les notes de promotions d'étudiants

![alt text](img/app-demo.drawio.png)

- Les différents cursus ont des responsables et des étudiants
- Les Cursus ont des examens
- Les examens ont une UE et un étudiant


| Route                                          | POST | GET | PATCH | DELETE | Accès         |
|------------------------------------------------|------|-----|-------|--------|---------------|
| /students                                      | ✓    | ✓   |       |        | Admin         |
| /students/:userID                              |      | ✓   |       |        | Student/Admin |
| /students/:userID/exams                        |      | ✓   |       |        | Students      |
| /students/:userID/exams/:ueName                |      | ✓   |       |        | Students      |
| /responsibles                                  | ✓    | ✓   |       |        | Admin         |
| /responsibles/:userID                          |      | ✓   |✓      |✓       | Admin         |
| /cursus                                        | ✓    | ✓   |       |        | Responsible   |
| /cursus/:cursusName/ue                         | ✓    | ✓   |       |        | Responsible   |
| /cursus/:cursusName/ue/:ueName                 |      | ✓   |✓      |✓       | Responsible   |
| /cursus/:cursusName/ue/:ueName/exams           | ✓    | ✓   |       |        | Responsible   |
| /cursus/:cursusName/ue/:ueName/exams/:userID   |      | ✓   |✓      |✓       | Responsible   |

# ORM
Object-relational mapping, librairie pour pour faire le lien entre des objets et une base de donnée.

On utilise un ORM pour communiquer avec une base de donnée PostgreSQL.



On utilise l'ORM MirkoORM (https://mikro-orm.io/)

## Installation dans NestJS

1. Créer le fichier ```docker-compose.yaml``` à la racine du projet :
```yaml
services:
  db:
    image: postgres:alpine
    environment:
      POSTGRES_PASSWORD: example
      POSTGRES_DB: nodeUsmApi
    ports:
      - "5432:5432"
```
2. Démarrer le container : ```docker compose up```

### Base donnée

### Importer la librairie
```properties
npm i @mikro-orm/core @mikro-orm/nestjs @mikro-orm/postgresql @mikro-orm/reflection
```

### Ajouter le fichier de configuration de MikroORM
Créer le fichier de configuration `mikro-orm.config.ts` à la racine du code source (dans le dossier /src)

```Typescript
import * as path from 'path';
import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default defineConfig({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'password',
  dbName: 'demoDB',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: path.join(__dirname, './migrations'),
    glob: '!(*.d).{js,ts}',
  },
  validate: true,
  debug: false,
});
```

###


### Configurer la librairie dans l'AppModule
Dans le fichier de configuration de l'AppModule : 
```Typescript
@Module({
  imports: [
    MikroOrmModule.forRoot(), // MikroORM trouvera le fichier de configuration 
  ],
  ...
})
export class AppModule {}
```

# Première Entité
On va d'abord se concentrer sur l'entité Student

![](img/user.drawio.png)


## *Person* : Entité Abstraite 

C'est une entité utilitaire qu'on va utiliser pour faire un peu moins de duplication de code

1. Créer le dossier /src/shared/entities
2. Créer le fichier /src/shared/entities/person.entity.ts

Dans ce fichier on veut décrire l'entité abstraite Person.

Pour [déclarer une entité MikroORM](https://mikro-orm.io/docs/defining-entities), on déclare une classe décorrée par **@Entity()**. Ici, on veut déclarer une entité particulière, on lui ajoute le paramètre suivant pour obtenir le décorateur @Entity(**{ abstract: true }**) (https://mikro-orm.io/docs/defining-entities#using-custom-base-entity).

Dans les champs de classe, on définit les différentes propritétés des tables (userID, lastNamen firstName) qu'on décort soit par **@PrimaryKey()** quand il s'agit d'une clé primaire, soit par **@Propetry()**.

Pour préciser qu'un champs ne peut pas être null, on lui ajoute un point d'exlacamtion à la fin de son nom.

De la même manière, si on veut préciser qu'un champs peut être null, on lui ajoute un point d'interrogation.


Exemple :
```Typescript
@Entity()
export class Book {

  @PrimaryKey()
  id!: string;

  @Property()
  author!: string;

  @Property()
  publisher?: string;
}
```
<h3>A vous de jouer : Créez l'entité abstraite **Person**  <h3>

## *Student* : une vraie Entité
1. On veut l'API gère l'entité Student, donc on dit à NestJS de nous créer les fichiers pour coder cette ressource :
    ```properties
    nest generate resource students
    ```
    ou
    ```properties
    nest g res students
    ```

2. Déclarer la nouvelle entité
    ```Typescript
    @Entity()
    export class Student extends Person {}
    ```
<h3>Vérifiez que l'application démarre bien sinon vous avez mal fait quelque chose<h3>

## Entités dans la base de données

MikroORM utilise un système de migration pour administrer la base de données. Avec toutes les entités déclarées, MikroORM détermine quelles opérations doivent être effectuées sur la base de données pour qu'elle colle au modèle qu'on a spécifié.

Il faut d'abord installer les dépendances requises :
```properties
npm install @mikro-orm/cli @mikro-orm/migrations
```
Et ajouter dans package.json ces lignes de configurations :
```json
 "mikro-orm": {
    "useTsNode": true,
    "configPaths": [
      "./src/mikro-orm.config.ts",
      "./dist/mikro-orm.config.js"
    ]
  }
```


1. Créer une nouvelle migration (comme le modèle a changé)
    ```
    npx mikro-orm migration:create
    ```
2. Migrer la base de donnée vers la dernière version de migration (Pour savoir où la base de donnée en est, MikroORM sauvegarde les données de migrations effectuées)
    ```
    npx mikro-orm migration:up 
    ```
## Création d'un *Student* : Endpoint POST

### Dto : Data transfert object

Pour créer un student, on a besoin de son nom et de son prénom qu'on obtiendra dans le **body** des requête post sur l'endpoint /students.

Si on ouvre le controller des students, on a quasiment rien à faire :
- Le Controller est déclaré (Décorateur *@Controller('students')*)
- Fonction pour la méthode POST déjà implémentée :
    ```Typescript
    @Post()
    create(@Body() createStudentDto: CreateStudentDto) {
        return this.studentsService.create(createStudentDto);
    }
    ```
Par contre il faut faut détailler quels données transits dans les **body** des requêtes. C'est à ça que servent les Dto.

#### Configuration de l'auto validation
1. Installer les dépendances `npm install class-validator class-transformer`
2. Modifier le lancement de l'application dans `main.js` pour activer le ValidationPipe (L'utilitaire qui va interceptée les exceptions des validations et les transformer en erreur HTTP) sur l'application en globalité
    ```Typescript
    async function bootstrap() {
        const app = await NestFactory.create(AppModule);
        app.useGlobalPipes(new ValidationPipe());
        await app.listen(3000);
        }
    bootstrap();
    ```
#### Déclaration d'un Dto
On déclare dans les champs d'un Dto le format des body de création d'une entités.
<details>

Pour l'entité Student ça serait
```Typescript
export class CreateStudentDto {
  lastname: string;
  firstname: string;
}
```
</details>


On utilise [les décorateurs de la librairie class-validator](https://github.com/typestack/class-validator#validation-decorators) pour ajouter les contraintes qu'on veut appliquer sur les champs du body.

<h3>A votre tour : </h3>

Custom le CreateStudentDto pour que dans le body **soit présent** les 2 **string** *firstName* et *lastName*.

### Service
Maintenant qu'on sait qu'on a bien les données voulues dans le Dto, on peut s'en servir pour créer une nouvelle entité et l'enregister en base de données.



On veut générer un identifiant unique pour le student de la forme *lastname***numero** (exemple : bidule1, bidule2, ect).
Pour cela, on va lire dans la base de donnée si il existe déjà un étudiant avec cet identifiant, et si oui incrémenté le numero jusqu'à trouver un identifant valable.

#### Comment intérroger la base de données ?
Il faut utiliser un [EntityRepository](https://mikro-orm.io/docs/usage-with-nestjs#repositories) qu'on injecte dans le service. Un repository est un utilitaire une couche au dessus de l'EntityManager, il nous permettra de manipuler une entité bien précise.

- L'EntityRepository expose différentes fonctions très utiles comme **findOrFail** ou bien **findAll**.
  - **ATTENTION !** : Les requêtes à la base de données étant asynchrones, attention à bien gérer les fonctions asynchrones de MikroORM.
  - **DOUBLE ATTENTION !!** : veiller à intercepter l'erreur levée par *findOrFail* quand elle ne trouve pas l'entité voulue. On fait un try/catch et on throw une [Exception que NestJS peut transformer en Erreur HTTP](https://docs.nestjs.com/exception-filters#built-in-http-exceptions) **NotFoundException**.

 
- Pour créer une entité on se sert de son constructeur : `new ENTITY()`

Créer une entité de suffit pas à la persister en base de donnée.

#### Enregistrer une entité en base de donnée
On se sert de l'EntityManager (de MikroORM) pour persister une nouvelle entité.

Pour se servir de l'EntityManger dans le service, on commence par l'injecter dans le service.
<details>

```Typescript
constructor(private em: EntityManager) {}
```
</details>

Pour enregistrer une entité il faut utiliser la fonction **persistAndFlush** de l'entityManager : 
```Typescript
await entityManager.persistAndFlush(ENTITY);
```

### GET GET PATCH
Oui c'est possible, avec toutes les informations ci-dessus ces endpoints sont réalisables.

### DELETE
Il faut utiliser la fonction **removerAndFlush** de l'EntityManager
```Typescript
await this.em.removeAndFlush(ENTITY);
```

# Et voilà
Je crois qu'on est bon