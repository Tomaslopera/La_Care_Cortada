CREATE DATABASE Care_Cortada;

USE Care_Cortada;

-- Tabla de Usuarios
CREATE TABLE Users (
    id VARCHAR(36) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Tabla de Membresías
CREATE TABLE Memberships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price VARCHAR(36) NOT NULL
);

-- Relación entre Usuarios y Membresías (opcional)
CREATE TABLE UserMemberships (
    user_id VARCHAR(36) NOT NULL,
    membership_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (membership_id) REFERENCES Memberships(id),
    PRIMARY KEY (user_id, membership_id)
);

-- Tabla de Productos
CREATE TABLE Products (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL
);

-- Tabla de Fotos
CREATE TABLE Photos (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    digital_price DECIMAL(10, 2) NOT NULL,
    physical_price DECIMAL(10, 2) NOT NULL,
    categories VARCHAR(255) NOT NULL,
    tags VARCHAR(255) NOT NULL,
    available_formats VARCHAR(100) NOT NULL,
    photographer VARCHAR(100) NOT NULL
);

-- Tabla de Modelos
CREATE TABLE Models (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    photos VARCHAR(255) NOT NULL,
    portfolio VARCHAR(255) NOT NULL,
    booking_info TEXT NOT NULL
);

-- Tabla de Eventos
CREATE TABLE Events (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    location VARCHAR(255) NOT NULL
);

-- Relación entre Eventos y Modelos
CREATE TABLE EventModels (
    event_id VARCHAR(36) NOT NULL,
    model_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Events(id),
    FOREIGN KEY (model_id) REFERENCES Models(id),
    PRIMARY KEY (event_id, model_id)
);

-- Relación entre Eventos y Productos
CREATE TABLE EventProducts (
    event_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (event_id) REFERENCES Events(id),
    FOREIGN KEY (product_id) REFERENCES Products(id),
    PRIMARY KEY (event_id, product_id)
);

-- Tabla de Carritos
CREATE TABLE Carts (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

-- Relación entre Carrito y Productos
CREATE TABLE CartItems (
    cart_id VARCHAR(36) NOT NULL,
    product_id VARCHAR(36) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (cart_id) REFERENCES Carts(id),
    FOREIGN KEY (product_id) REFERENCES Products(id),
    PRIMARY KEY (cart_id, product_id)
);