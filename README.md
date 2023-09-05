# Nouvelle étape, nouvel objectif
On veut ajouter les cursus à l'application
![](img/2.png)
## CursusResponsible
De le même manière que pour les Student, on ajoute la nouvelle entité **CursusResponsible** et son endpoint

## Cursus
### Description d'un Cursus
- A pour clé primaire son nom
- **Contient une liste d'étudiant**
- **Contient une liste de responsable**

**Comment Modéliser des relations entre entités ??**
### Modéliser des Relations
Il faut se référer à la [documentation de MikroOrm](https://mikro-orm.io/docs/relationships).

On compte 4 Type de relations :
- En se plaçant dans du point de vue de l'entité **A**, on a donc affaire à une relation de type **One To Many** vers la classe **B**

    ![](img/one2many.png)

    ```Typescript
    @OneToMany(() => B, b => b.a)
    collectionOfB = new Collection<Book>(this);
    ```

    **ATTENTION** Une relation **One To Many** **a besoin** de sa relation inverse **Many To One** du côté de l'entité liée (Dans notre cas, **B** appartient à un **A**). Elle se déclare de cette manière :

    ```Typescript
    @ManyToOne()
    a: A;
    ```

- Les relations **One To One**,

    ![](img/one2one.png)

    qui se déclarent de la manière suivante du côté de la class Owner (Si on se dit que c'est la classe A qui a un B et non la classe B qui a un A)
    ```Typescript
    @OneToOne()
    relatedB: B;
    ```

    La relation inverse n'est pas nécessaire comme pour les relations *OneToMany/ManyToOne*. Elle se déclare de cette manière :
    ```Typescript
    @OneToOne({ mappedBy: 'relatedB', orphanRemoval: true })
    relatedA: A;
    ```
    (*mappedBy:* **'relatedB'** parce que dans A, le champs de B s'apelle relatedB)


- Les relations **Many to Many**,

    - **Unidirectionnel**

        On déclare dans une class Owner la relation comme suit
        ```Typescript
        @ManyToMany()
        listOfB = new Collection<B>(this);
        ```
    - **Bidirectionel**

        En plus de déclarer la relation en mode Unidirectionnel, on déclare la relation inverse dans la classe liée :
        ```Typescript
        @ManyToMany(() => A, a => a.listOfB)
        listOfA = new Collection<A>(this);
        ```

    ![](img/one2one.png)

    qui se déclarent de la manière suivante du côté de la class Owner (Si on se dit que c'est la classe A qui a un B et non la classe B qui a un A)
    ```Typescript
    @OneToOne()
    relatedB: B;
    ```

    La relation inverse n'est pas nécessaire comme pour les relations *OneToMany/ManyToOne*. Elle se déclare de cette manière :
    ```Typescript
    @OneToOne({ mappedBy: 'relatedB', orphanRemoval: true })
    relatedA: A;
    ```
    (*mappedBy:* **'relatedB'** parce que dans A, le champs de B s'apelle relatedB).


### A votre tour : créer l'entité Cursus !

### Update et Create un peu plus complexe
#### Dto
Compléter le CreateDto pour  qu'il contienne
1. Un string pour le nom du Cursus
2. Un tableau de string pour les étudiants
3. Un tableau de string pour les responsables de cursus

<details>
[Doc Class Validator pour la validation de tableau](https://github.com/typestack/class-validator#validating-arrays)
</details>

#### Service

Il faut peupler les collection de students et de responsable de l'entité qu'on veut créer ou mettre à jour. Pour cela il faut donc qu'on manipule ces entité et par conséquent il faut faire appel à leurs services.

Comment utiliser les services dans un autre service ???
<details>
En l'injectant dans le Service. Dans notre cas avec le CursusService ça ressemblerait à :

```Typescript
constructor(
    ...
    private readonly studentsService: StudentsService,
    ...
  ) {}
```

On remarque qu'on se retrouve avec une erreur : C'est normal, il faut dire à NestJs qu'on utilise le StudentsService dans le CursusModule :
```Typescript
providers: [CursusService, StudentsService],
```
Maintenant, on retombe sur une nouvelle erreur. Comme on utilise le StudentsService, alors on utilise indirectement une nouvelle entité qu'il faut préciser dans le CursusModule.

Il faut renseigner les entités utilisées directement ou indirectement dans le Module.
```Typescript
imports: [MikroOrmModule.forFeature([Cursus, Student])],
```


</details>

Pour peupler une collection, on utilise [la fonction add des Collections](https://mikro-orm.io/api/core/class/Collection#add).

- Pour chaque identifiant de la liste de la Dto
    1. On trouve une entité via son identifiant
    2. On l'ajoute à la Collection

Lors des mises à jour, avant de peupler la collection, on vide la collection au préalable avec la fonction de Collection 