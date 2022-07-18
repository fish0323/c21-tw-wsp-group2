--  create db
-- change to db

\c wsp_group2

CREATE TABLE "users"(
    "id" SERIAL primary key,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "created_at" DATE NOT NULL
);
CREATE TABLE "products"(
    "id" SERIAL primary key,
    "name" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,
    "suggest_price" DECIMAL NOT NULL,
    "console_by" VARCHAR(255),
    "product_detail" TEXT
);
CREATE TABLE "wts"(
    id SERIAL primary key,
    users_id INTEGER NOT NULL,
    upload_date VARCHAR(255) NOT NULL,
    input_price_sell INT NOT NULL,
    depreciation_rate VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL,
    products_id INT NOT NULL,
    FOREIGN KEY (users_id) REFERENCES users(id) on delete cascade on update cascade,
    FOREIGN KEY (products_id) REFERENCES products(id)
);
CREATE TABLE "wtb"(
    id SERIAL primary key,
    users_id INTEGER NOT NULL,
    upload_date VARCHAR(255) NOT NULL,
    input_price_buy INT NOT NULL,
    depreciation_rate VARCHAR(255) NOT NULL,
    products_id INT NOT NULL,
    FOREIGN KEY (users_id) REFERENCES users(id) on delete cascade on update cascade,
    FOREIGN KEY (products_id) REFERENCES products(id)
);


-- DROP TABLE users;
-- DROP TABLE products;
-- DROP TABLE wish_list;
-- DROP TABLE brand;

-- SELECT *
-- FROM users;
-- SELECT *
-- FROM products;