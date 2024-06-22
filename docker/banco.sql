-- Category table
CREATE TABLE tb_category (
                             id_category SERIAL PRIMARY KEY,
                             description VARCHAR(255) NOT NULL
);

ALTER SEQUENCE tb_category_id_category_seq RENAME TO seq_category;

-- Suppliers table
CREATE TABLE tb_supplier (
                             id_supplier SERIAL PRIMARY KEY,
                             name VARCHAR(255) NOT NULL,
                             contact VARCHAR(255) NOT NULL
);

ALTER SEQUENCE tb_supplier_id_supplier_seq RENAME TO seq_supplier;

-- Products table
CREATE TABLE tb_product (
                            id_product SERIAL PRIMARY KEY,
                            description VARCHAR(255) NOT NULL,
                            price NUMERIC(10,2) NOT NULL,
                            category_id INTEGER NOT NULL REFERENCES tb_category(id_category),
                            supplier_id INTEGER NOT NULL REFERENCES tb_supplier(id_supplier)
);

ALTER SEQUENCE tb_product_id_product_seq RENAME TO seq_product;

-- Sales table
CREATE TABLE tb_sale (
                         id_sale SERIAL PRIMARY KEY,
                         quantity INTEGER NOT NULL,
                         total_value NUMERIC(10,2) NOT NULL,
                         product_id INTEGER NOT NULL REFERENCES tb_product(id_product)
);

ALTER SEQUENCE tb_sale_id_sale_seq RENAME TO seq_sale;

-- Stock table
CREATE TABLE tb_stock (
                          id_stock SERIAL PRIMARY KEY,
                          product_id INTEGER NOT NULL REFERENCES tb_product(id_product),
                          addition BOOLEAN NOT NULL,
                          quantity INTEGER NOT NULL,
                          total_value NUMERIC(10, 2) NOT NULL
);

ALTER SEQUENCE tb_stock_id_stock_seq RENAME TO seq_stock;
