## Projet pour l'UE programmation web

## Initialisation de la base de données

Lancer une session mysql et entrer dans le prompt la commande suivante:
```
source path/to/microblog.sql
```
`path/to/microblog.sql` correspondant au chemin vers le fichier `microblog.sql`
Cette commande créée la base de données et insère dedans toute les données pour représenter l'état à un instant T du site.

## Configuration

Aller dans le fichier `config.js` dans le dossier `backend/config/` et remplir les champs de `host`, `user` et `password` correspondant à votre configuration afin de vous connecter à la base de données.

## Exécution

Ouvrez deux terminaux, un pour le backend et un pour le frontend

### Backend
Taper:
```
cd backend
npm install
node index.js
```
La console précisera sur quel port le serveur est lancé, ici port 5000.

### Frontend
Taper:
```
cd frontend
npm install
npm run serve
```
La console précisera sur quel port l'application est lancé (par défaut port 8080).

## Utilisation

Des utilisateurs sont prédéfinis dans la base de données dont voici les identifiants et les mots de passes:

* Compte :
    + Identifiant: diderot@mail.fr
    + Mot de passe: diderot7

* Compte :
    + Identifiant: descartes@mail.fr
    + Mot de passe: descartes5

* Compte :
    + Identifiant: spinoza@mail.fr
    + Mot de passe: spinoza4

* Compte :
    + Identifiant: sophocle@mail.fr
    + Mot de passe: sophocle2

* Compte :
    + Identifiant: platon@mail.fr
    + Mot de passe: platon3

    
Bien sur l'application intégrant une fonctionnalité d'enregistrement de nouveaux utilisateurs,
rien n'empêche d'en créer de nouveau.

## Licence

Ce logiciel est distribué sous la licence MIT
