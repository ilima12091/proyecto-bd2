DROP TABLE IF EXISTS EsSubcampeon CASCADE;
DROP TABLE IF EXISTS EsCampeon CASCADE;
DROP TABLE IF EXISTS Predice CASCADE;
DROP TABLE IF EXISTS Partido CASCADE;
DROP TABLE IF EXISTS Estadio CASCADE;
DROP TABLE IF EXISTS Sede CASCADE;
DROP TABLE IF EXISTS Pais CASCADE;
DROP TABLE IF EXISTS Equipo CASCADE;
DROP TABLE IF EXISTS Alumno_Carrera CASCADE;
DROP TABLE IF EXISTS Carrera CASCADE;
DROP TABLE IF EXISTS Area CASCADE;
DROP TABLE IF EXISTS Alumno CASCADE;
DROP TABLE IF EXISTS Administrador CASCADE;
DROP TABLE IF EXISTS Usuario CASCADE;
DROP TABLE IF EXISTS Torneo CASCADE;

-- Tabla Usuario
CREATE TABLE Usuario (
    id SERIAL PRIMARY KEY,
    fechaCreacion DATE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    contraseña VARCHAR(50) NOT NULL,
    email VARCHAR(75) NOT NULL UNIQUE
);

-- Tablas para subtipos de Usuario
CREATE TABLE Administrador (
    id SERIAL PRIMARY KEY,
    usuarioId INT UNIQUE REFERENCES Usuario(id)
);

CREATE TABLE Alumno (
    id SERIAL PRIMARY KEY,
    usuarioId INT UNIQUE REFERENCES Usuario(id)
);

-- Tabla Area
CREATE TABLE Area (
    id SERIAL PRIMARY KEY,
    area VARCHAR(50) UNIQUE
);

-- Tabla Carrera
CREATE TABLE Carrera (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    area INT REFERENCES Area(id)
);

-- Relación pertenece entre Alumno y Carrera
CREATE TABLE Alumno_Carrera (
    alumnoId INT REFERENCES Alumno(id),
    carreraId INT REFERENCES Carrera(id),
    PRIMARY KEY (alumnoId, carreraId)
);

-- Tabla Equipo
CREATE TABLE Equipo (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Tabla País
CREATE TABLE Pais (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    confederacion VARCHAR(50) NOT NULL
);

-- Tabla Sede
CREATE TABLE Sede (
    id SERIAL PRIMARY KEY,
    ciudad VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    paisId INT REFERENCES Pais(id)
);

-- Relación pertenece entre Sede y País
ALTER TABLE Sede ADD CONSTRAINT fk_pais FOREIGN KEY (paisId) REFERENCES Pais(id);

-- Tabla Estadio
CREATE TABLE Estadio (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    idSede INT REFERENCES Sede(id)
);

-- Tabla Partido
CREATE TABLE Partido (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    etapa VARCHAR(50) NOT NULL,
    idEstadio INT REFERENCES Estadio(id),
    idEquipoLocal INT REFERENCES Equipo(id),
    idEquipoVisitante INT REFERENCES Equipo(id),
    golesLocal INT,
    golesVisitante INT
);

-- Tabla Predice
CREATE TABLE Predice (
    id SERIAL PRIMARY KEY,
    idAlumno INT REFERENCES Alumno(id),
    idPartido INT REFERENCES Partido(id),
    golesLocal INT,
    golesVisitante INT,
    puntosObtenidos INT DEFAULT NULL
);

-- Relación Es Campeón y Es Subcampeón
CREATE TABLE EsCampeon (
    id SERIAL PRIMARY KEY,
    idEquipo INT REFERENCES Equipo(id),
    idAlumno INT REFERENCES Alumno(id),
    puntosObtenidos INT DEFAULT NULL
);

CREATE TABLE EsSubcampeon (
    id SERIAL PRIMARY KEY,
    idEquipo INT REFERENCES Equipo(id),
    idAlumno INT REFERENCES Alumno(id),
    puntosObtenidos INT DEFAULT NULL
);

-- Tabla Torneo
CREATE TABLE Torneo (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    equipoId INT unique references Equipo(id)
);
