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
DROP EXTENSION IF EXISTS pgcrypto;

CREATE EXTENSION pgcrypto;

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

-- Relación "pertenece" entre Alumno y Carrera
CREATE TABLE Alumno_Carrera (
    alumnoId INT REFERENCES Alumno(id),
    carreraId INT REFERENCES Carrera(id),
    PRIMARY KEY (alumnoId, carreraId)
);

-- Tabla Equipo
CREATE TABLE Equipo (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    urlLogo VARCHAR(300) DEFAULT NULL
);

-- Tabla País
CREATE TABLE Pais (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    confederacion VARCHAR(50) NOT NULL,
    iso VARCHAR(3) NOT NULL
);

-- Tabla Sede
CREATE TABLE Sede (
    id SERIAL PRIMARY KEY,
    ciudad VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    paisId INT REFERENCES Pais(id)
);

-- Relación "pertenece" entre Sede y País
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
    puntosObtenidos INT DEFAULT 0,
    CONSTRAINT unique_alumno_partido UNIQUE (idAlumno, idPartido)
);

-- Relaciones "Es Campeón" y "Es Subcampeón"
CREATE TABLE EsCampeon (
    id SERIAL PRIMARY KEY,
    idEquipo INT REFERENCES Equipo(id),
    idAlumno INT REFERENCES Alumno(id),
    puntosObtenidos INT DEFAULT 0
);

CREATE TABLE EsSubcampeon (
    id SERIAL PRIMARY KEY,
    idEquipo INT REFERENCES Equipo(id),
    idAlumno INT REFERENCES Alumno(id),
    puntosObtenidos INT DEFAULT 0
);

-- Tabla Torneo
CREATE TABLE Torneo (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    equipoId INT unique references Equipo(id)
);

INSERT INTO Usuario (fechaCreacion, nombre, apellido, contraseña, email) VALUES
('2024-01-01', 'Carlos', 'Gomez', 'password123', 'carlos.gomez@example.com'),
('2024-01-02', 'Laura', 'Martinez', 'password456', 'laura.martinez@example.com'),
('2024-01-03', 'Pedro', 'Lopez', 'password789', 'pedro.lopez@example.com');

INSERT INTO Administrador (usuarioId) VALUES
(1);

INSERT INTO Alumno (usuarioId) VALUES
(2),
(3);

INSERT INTO Area (area) VALUES
('Ingeniería'),
('Ciencias Sociales'),
('Ciencias Naturales');

INSERT INTO Carrera (nombre, codigo, area) VALUES
('Ingeniería de Software', 'IS001', 1),
('Psicología', 'PS001', 2),
('Biología', 'BIO001', 3);

INSERT INTO Alumno_Carrera (alumnoId, carreraId) VALUES
(1, 1),
(2, 2);

INSERT INTO Equipo (nombre, urlLogo) VALUES
('Uruguay', 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Uruguay.svg'),
('Argentina', 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg'),
('Brasil', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/640px-Flag_of_Brazil.svg.png'),
('Colombia', 'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg');

INSERT INTO Pais (nombre, confederacion, iso) VALUES
('Uruguay', 'CONMEBOL', 'CO'),
('Argentina', 'CONMEBOL', 'UY'),
('Brasil', 'CONMEBOL', 'AR'),
('Colombia', 'CONMEBOL', 'BR'); 

INSERT INTO Sede (ciudad, estado, paisId) VALUES
('Montevideo', 'Montevideo', 1),
('Buenos Aires', 'Capital Federal', 2),
('São Paulo', 'São Paulo', 3),
('Medellín', 'Medellín', 4);

INSERT INTO Estadio (nombre, idsede) VALUES
('Estadio centenario', 1),
('Estadio Monumental', 2),
('Estadio Morumbi', 3),
('Estadio Atanasio Girardot', 4);

INSERT INTO Partido (fecha, etapa, idestadio , idequipolocal, idequipovisitante) VALUES
('2024-07-10', 'Grupo A', 2, 2, 1),
('2024-07-12', 'Grupo B', 4, 4, 3),
('2024-07-10', 'Grupo C', 2, 3, 1),
('2024-07-12', 'Grupo D', 4, 4, 2);

INSERT INTO Partido (fecha, etapa, idestadio , idequipolocal, idequipovisitante, goleslocal, golesvisitante) VALUES
('2024-06-10', 'Grupo A', 1, 1, 2, 2, 1),
('2024-06-10', 'Grupo B', 3, 3, 4, 1, 1),
('2024-06-11', 'Grupo C', 1, 1, 3, 3, 0),
('2024-06-11', 'Grupo D', 3, 2, 4, 1, 2);

INSERT INTO Predice (idalumno, idpartido, golesLocal, golesVisitante) VALUES
(1, 1, 2, 1),
(2, 1, 2, 2),
(1, 2, 0, 2),
(2, 2, 0, 0),
(1, 3, 1, 2),
(2, 3, 1, 1),
(1, 4, 1, 0),
(2, 4, 2, 3);

INSERT INTO EsCampeon (idequipo, idalumno, puntosObtenidos) VALUES
(1, 1, 10),
(3, 2, 8);

INSERT INTO EsSubcampeon (idequipo, idalumno, puntosObtenidos) VALUES
(2, 1, 6),
(4, 2, 7);