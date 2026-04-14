CREATE DATABASE IF NOT EXISTS tienda_car_audio;
USE tienda_car_audio;

DROP TABLE IF EXISTS carrito;
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS categorias;

CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL UNIQUE,
  descripcion VARCHAR(255) DEFAULT NULL
);

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(160) NOT NULL,
  descripcion TEXT NOT NULL,
  precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
  imagen VARCHAR(500) NOT NULL,
  stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  categoria_id INT NOT NULL,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE carrito (
  id INT AUTO_INCREMENT PRIMARY KEY,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL DEFAULT 1 CHECK (cantidad > 0),
  fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO categorias (nombre, descripcion) VALUES
('Subwoofers', 'Subwoofers de alto desplazamiento y presión sonora'),
('Amplificadores', 'Amplificadores de potencia Hi-Fi y SPL'),
('DSP y procesadores', 'Procesamiento digital y restauración de señal'),
('Medios y tweeters', 'Medios premium y tweeters de alta sensibilidad'),
('Accesorios', 'Cableado, distribución y protección eléctrica');

INSERT INTO productos (nombre, descripcion, precio, imagen, stock, categoria_id) VALUES
('Subwoofer 12” SPL Force', 'Bobina dual 2 ohm, cono reforzado y 1500W RMS para graves contundentes.', 329.99, 'https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=1200&auto=format&fit=crop', 15, 1),
('Subwoofer 15” Bass Dominator', 'Diseñado para SPL extremo, suspensión alta excursión y enfriamiento avanzado.', 459.00, 'https://images.unsplash.com/photo-1558403247-1f1e5f9f4b0e?q=80&w=1200&auto=format&fit=crop', 10, 1),
('Amplificador Monoblock 3000W', 'Clase D eficiente con control de bass boost y filtro subsónico.', 699.50, 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1200&auto=format&fit=crop', 8, 2),
('Amplificador 4 Canales Hi-Fidelity', 'Separación de canales superior y respuesta limpia para SQ premium.', 549.00, 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=1200&auto=format&fit=crop', 12, 2),
('Procesador DSP 8 canales', 'Alineación temporal, crossover activo y ecualización paramétrica avanzada.', 429.00, 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?q=80&w=1200&auto=format&fit=crop', 11, 3),
('Restaurador digital de bajos', 'Recupera frecuencias bajas perdidas y mejora pegada en sistemas OEM.', 179.90, 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop', 20, 3),
('Set de medios premium 6.5”', 'Medios de fibra con alta definición de voz y gran dinámica musical.', 249.00, 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=1200&auto=format&fit=crop', 18, 4),
('Tweeters bala alta sensibilidad', 'Tweeters tipo bala para proyección de agudos con claridad extrema.', 129.00, 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=1200&auto=format&fit=crop', 25, 4),
('Kit de cableado 0 AWG', 'Cobre OFC premium para máxima conducción y menor caída de voltaje.', 99.99, 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop', 30, 5),
('RCA blindado premium', 'Cable RCA trenzado con blindaje anti-ruido para señal limpia.', 39.50, 'https://images.unsplash.com/photo-1551817958-20204d6ab8f2?q=80&w=1200&auto=format&fit=crop', 40, 5),
('Portafusibles ANL', 'Protección robusta para líneas de alimentación de alta corriente.', 27.90, 'https://images.unsplash.com/photo-1581092160607-ee22731d8a62?q=80&w=1200&auto=format&fit=crop', 35, 5),
('Distribuidor de corriente', 'Bloque de distribución para instalación ordenada y segura.', 32.00, 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop', 22, 5);

INSERT INTO carrito (producto_id, cantidad) VALUES
(1, 1),
(3, 1);
