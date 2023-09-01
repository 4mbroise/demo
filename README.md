# 1 - Installation du CLI NestJS
```properties
npm i -g @nestjs/cli
```
# 2 - Création d'une application NestJS
```properties
nest g application <Nom de l'application>
nest g application
# Installation des dépendances
npm install
```

Si tout est bien fait alors on peut démarrer l'application avec la commande.
```properties
npm run start:dev
```

# 3 - Que fait NestJS ???
Les différents composants d'une application NestJS sont séparés en module. (Ils ont pour utilité d'organiser le projet de façon à ce que NestJS puisse instancier les différents composants créés)

À la création de l'application, le module **app** a été créé (voir les fichiers sources).

A la création d'un module, 4 types fichiers sont créé :
| Fichier | Description |
| ----------- | ----------- |
| *ressource*.module.ts | Fichier de configuration du module |
| *ressource*.controller.ts | Controller de base du module |
| *ressource*.service.ts | Service de base associé au Controller généré |
| *ressource*.*controller/service*.spec.ts | Fichier de test unitaire |

## A - main.ts
L'application démarre via le fichier main.ts qui lance la fonction `bootstrap()`

La fonction `bootstrap()` sert à configurer de quelle manière l'application se lance. On voit que par défaut, l'application démarre avec comme module principal le `AppModule` et que l'application écoute sur le port 3000.

## Fichier de configuration de module
On renseigne les composants NestJs nécéssaire au fonctionnement du Module.

Pour le moment, dans le fichier de configuration de l'`AppModule` sont renseignés sont controller et son service.

A terme dans les imports, on y trouvera tous les autres modules qu'on génèrera par le suite. Cela permettra de construire une sorte d'arborescence des modules pour NestJS.

## Controller et Services 
### Fonctionnement de NestJS en globalité
![alt text](img/NestJS%20Global%20fonctionnement.drawio.png)
1. L'application NestJS reçoit une requêtre HTTP entrante.
2. En fonction du chemin, la requête va être dirigé vers le controller qui doit prendre la requpete entrante en charge.
3. Au sein du controller, la requête est prise en charge par le handler. Les informations sont extraites (ou non) de la requête donne au service.
4. Le service donne une réponse au controller avec les données fournies.
5. Le controller donne une réponse à NestJS à la requête entrante.
6. Nest JS, transforme la réponse du controller en une réponse HTTP.

### Etude de cas : AppModule
#### Controller
1. On déclare une nouvelle classe qu'on inscrit dans la liste des controllers du module
2. On spécifie que le classe est un controller avec le décorateur **@Controller()** au dessus de la classe. Ici, on n'a pas mis de route dans le décorateur, donc le décorateur regarde ce qu'il se passe à la racine des routes de l'API.
3. On déclare un handler sous la forme d'une fonction qu'on décore avec un des décorateurs HTTP de NestJS pour préciser quelle type de requête HTTP le handler doit prendre en charge. De la même manière que pour la balise *@Controller*, aucune route n'est précisée donc le handler du controller de l'AppModule prend en charge les requêtes HTTP **GET** sur la route **/**
4. On utilise le service (Injecté dans le constructeur du controller), pour faire répondre le controller
#### Service
**Ils ont pour utilité de manipuler les données de l'API.**

 Dans le cas de l'AppModule, c'est un service basique sans utilitée, parce qu'on aurait pu retourner le string de la fonction utilisée dans le Controller directement dans le Controller...

#### Résultat
Au final, l'application répond *"Hello World"* quand on fait un GET sur la route */*.


Aucune autre endpoint n'est déclaré, donc si on interroge l'API sur une autre route, elle répondra par une erreur HTTP 404.