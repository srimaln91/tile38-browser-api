# TIle38 Browser API

a HTTP API implementation to retrieve Tile38 data.

## Endpoints

### Get a list of collections

```text
GET <endpoint>/collections
```

### Get a list of objects in a specific collection

```text
GET <endpiint>/collections/<collection>
```

### Get a single object

```text
GET <endpoint>//collections/<collection>/id/<id>
```

## Configuration

Use below environment variables to configure the application

```text
APP_PORT = 8080
T38_HOST = localhost
T38_PORT = 9851
```
