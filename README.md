# Prerrequisitos

- Node, última versión
- PostgreSQL, última versión
- Asegurarse de tener tanto el puerto 3000 como el puerto 3002 disponibles

# Configuración

1. Crear el contenedor de postgreSQL con docker utilizando este comando `docker run --name proyecto-bd2 -e POSTGRES_PASSWORD=user -e POSTGRES_USER=user -d -p 5432:5432 postgres`
2. Crear la base de datos `proyectobd2` dentro del contenedor generado
3. Tras crear una base de datos con PostgreSQL, crear un archivo .env en el directorio _backend_
4. En el archivo .env, cargar los datos de conexión a la base de datos, formato del archivo:
   js

- DATABASE_USER=usuarioPostgres
- DATABASE_PASSWORD=contraseñaPostgres
- DATABASE_HOST=localhost
- DATABASE_NAME=nombreBD
- DATABASE_PORT=puertoBD

3. Abrir la terminal y posicionarse en los directorios _backend_ y _frontend_, en ambos directorios instalar las dependencias con npm i.

# Ejecutar el proyecto

- Copiar y pegar el contenido del archivo `ddl.sql` (`/backend/db/ddl.sql`) dentro de la consola de postgreSQL para generar las tablas y algunos inserts de prueba

- Abrir una consola, moverse a la carpeta de `frontend`, ejecutar `npm i` en caso de no haberlo hecho y ejecutar `npm run dev`

- Abrir otra consola (manteniendo abierta la anterior) y moverse a la carpeta de `backend`, ejecutar `npm i` en caso de no haberlo hecho y ejectura `npm run start:dev`

- Abrir un navegador y dirigirse a http://localhost:3000/login
