# Etape suivante, Imbrication : routing plus complexe et clé primaire composite
On veut ajouter à l'application la notion d'UE qui sont propre à un Cursus (Owner).

![](img/3.png)

## Ajouter l'entité
La méthode ne change pas grandement par rapport à ce qu'on a déjà fait. La seule différence réside dans la gestion de **clé primaire de UE** qui est **composée du Cursus** auquel il appartient **et de son nom**.

**HEUREUSEMENT** [MikroORM documente](https://mikro-orm.io/docs/composite-keys#use-case-1-dynamic-attributes) bien la gestion des clé primaire composite et des clé étrangère comme clé primaire.

#### Dans un premier temps
Ajouter la nouvelle entité comme on sait le faire (càd le fichier .entity.ts. On ne touche pas au service et on peut d'ores et déjà supprimer  fichier du controller).

On s'occupe du problème de a la clé primaire composite juste ensuite.

#### Temps n°2 : Clé primaire composite, on y vient
On se réfère à la [documentation de MikroORM](https://mikro-orm.io/docs/composite-keys#use-case-1-dynamic-attributes)

1. Dans le champs cursus de l'entité UE qu'on a ajouté pour modéliser la relation entre UE et Cursus, on ajoute le paramètre suivant **{primary: true}** pour obtenir
    ```Typescript
    @ManyToOne()
    cursus: Cursus;
    ```

2. On ajoute la ligne suivant
    ```Typescript
    [PrimaryKeyType]?: [string, string];
    ```

    - La partie *[PrimaryKeyType]?* est nécessaire c'est MikroORM qui impose ça
    - La partie de droite, le tableau c'est le type de la clé primaires (clé primaire de cursus => string + la demie clé primaire de UE => string )

## Ajouter un controller
Pour rappelle on veut imbriquer l'endpoint des UEs dans celui des Cursus
| Route                                          | POST | GET | PATCH | DELETE | Accès         |
|------------------------------------------------|------|-----|-------|--------|---------------|
| /cursus/:cursusName/ue                         | ✓    | ✓   |       |        | Responsible   |
| /cursus/:cursusName/ue/:ueName                 |      | ✓   |✓      |✓       | Responsible   |

On va donc ajouter un nouveau controller dans le module Cursus : 
1. Créer le fichier */src/cursus/controllers/ue.controller.ts*
2. Déplacer le fichier */src/cursus/cursus.controller.ts* dans le dossier */src/cursus/controllers/*
3. On déclare dans le fichier */src/cursus/controllers/ue.controller.ts* un nouveau controller dont le chemin est *cursus/:cursusName/ue*, on aura alors 
    <details>
    On devrait obtenir la classe suivante :

    ```Typescript
    @Controller('cursus/:cursusName/ue')
    export class UeController {
        ...
    }
    ```
    </details>
4. Enfin, on complète le controller avec les endpoints du CRUD (findall, find, create, update) (fonctions avec les décorateur HTTP @GET, @POST, @PATCH, @ÐELETE)
    - A l'intérieur des controller on utilisera le service et les DTOs de l'entité imbriquée (ici, UeService, CreateUeDto et UpdateUeDto)
    - **Attention** On a inséré un paramètre sur le chemin du controller, donc il faut bien veiller à le récupérer en paramètre des différents endpoints !!!

## Modifier le service
1. On utilise des clé primaires composite, donc dans les fonctions qui en ont besoin, il faut lui ajouté la (les) clé manquante.
    <details>
    Il faut le faire dans toutes les fonctions en fait ;)
    </details>

