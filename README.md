# {{ .ProjectName }}

## Développement
```bash
make deps
make dump-config
make watch
```

Les services suivants devraient être disponibles après démarrage de l'environnement:

|Service|Type|Accès|Description|
|-------|----|-----|-----------|
|Application React|HTTP (UI)|http://localhost:9000/|Page d'accueil de l'application React|
|Interface Web GraphQL|HTTP (UI)|http://localhost:9000/graphql (GET)|Interface Web de développement de l'API GraphQL (mode debug uniquement)|
|Serveur GraphQL|HTTP (GraphQL)|http://localhost:9000/graphql (POST)|Point d'entrée de l'API GraphQL|
