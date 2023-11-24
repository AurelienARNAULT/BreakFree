# BeakFree
## Tableau dans un tableau

### Configuration Requise

Pour exécuter cette application, assurez-vous que les packages requis sont installés sur votre système. Les dépendances requises sont listées dans le fichier `requirements.txt`.

### Installation

1. **Installer les Dépendances** : 
   Ouvrez un terminal et naviguez jusqu'au répertoire contenant le fichier `requirements.txt`. Exécutez la commande suivante pour installer les dépendances :

```sh
pip3 install -r requirements.txt
``````


2. **Configuration du Serveur Socket.io** :
Assurez-vous que le serveur Socket.io est en cours d'exécution et accessible. Par défaut, l'application se connecte à `http://localhost:3000`.

## Exécution de l'Application

Pour lancer l'application, exécutez le script `tableau.py` depuis votre terminal :

```sh
 python3 tableau.py
 ```

L'application démarre en mode plein écran. Utilisez votre souris pour dessiner sur le tableau virtuel. Les zones spécifiques pour le dessin sont marquées sur l'écran.

### Commandes

- **Dessin** : Cliquez et déplacez la souris sur les zones désignées pour dessiner.
- **Quitter** : Appuyez sur la touche `ESCAPE` pour quitter l'application.