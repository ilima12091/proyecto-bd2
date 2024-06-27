# Pasos para iniciar el proyecto

- Crear el contenedor de postgreSQL con docker utilizando este comando `docker run --name proyecto-bd2 -e POSTGRES_PASSWORD=user -e POSTGRES_USER=user -d -p 5432:5432 postgres`

- Crear la base de datos `proyectobd2` dentro del contenedor generado

- Copiar y pegar el contenido del archivo `ddl.sql` (`/backend/db/ddl.sql`) dentro de la consola de postgreSQL para generar las tablas y algunos inserts de prueba

- Abrir una consola, moverse a la carpeta de `frontend`, ejecutar `npm i` en caso de no haberlo hecho y ejecutar `npm run dev`

- Abrir otra consola (manteniendo abierta la anterior) y moverse a la carpeta de `backend`, ejecutar `npm i` en caso de no haberlo hecho y ejectura `npm run start:dev`

- Abrir un navegador y dirigirse a http://localhost:3000/login
