CREATE TABLE products(
    id SERIAL primary key,
    name VARCHAR(255),
    cat_1 VARCHAR(255),
    cat_2 VARCHAR(255),
    img_url VARCHAR(255),
    suggest_price DECIMAL NOT NULL
);
DROP TABLE products;
INSERT INTO products(name, cat_1, cat_2, suggest_price)
values ('PS5', 'game', 'playstation', 250),
    ('PS4', 'console', 'nintendo', 350);
SELECT *
FROM products;
SELECT *
FROM products
where id = 1;