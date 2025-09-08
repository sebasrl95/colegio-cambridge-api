-- CREACIÓN DE TABLAS
CREATE TABLE area (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE oficina (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL,
    area_id INT REFERENCES area(id) ON DELETE CASCADE
);

CREATE TABLE salon (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL
);

CREATE TABLE empleado (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    documento VARCHAR(50) UNIQUE NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    area_id INT REFERENCES area(id) ON DELETE SET NULL,
    oficina_id INT REFERENCES oficina(id) ON DELETE SET NULL
);

CREATE TABLE profesor (
    id INT PRIMARY KEY REFERENCES empleado(id) ON DELETE CASCADE,
    tipoProfesor VARCHAR(50) NOT NULL
);

CREATE TABLE administrativo (
    id INT PRIMARY KEY REFERENCES empleado(id) ON DELETE CASCADE
);

-- INSERCIÓN DE DATOS DE PRUEBA
INSERT INTO area (nombre) VALUES 
('Área Académica'),
('Área Administrativa');

INSERT INTO oficina (codigo, area_id) VALUES
('OF-101', 1),
('OF-102', 1),
('OF-201', 2);

INSERT INTO salon (codigo) VALUES
('SL-301'),
('SL-302');

-- Empleados base
INSERT INTO empleado (nombre, documento, tipo, area_id, oficina_id) VALUES
('Juan Pérez', '12345', 'Profesor', 1, 1),
('María Gómez', '67890', 'Profesor', 1, 2),
('Carlos Ruiz', '54321', 'Administrativo', 2, 3);

-- Profesores
INSERT INTO profesor (id, tipoProfesor) VALUES
(1, 'Planta'),
(2, 'Contratista');

-- Administrativos
INSERT INTO administrativo (id) VALUES
(3);
