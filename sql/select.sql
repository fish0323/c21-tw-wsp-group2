-- JUST for reference, no use

-- select game console
SELECT * FROM products WHERE type = 'console';

-- select video games
SELECT * FROM products WHERE type = 'game';

-- select ps5 video games
SELECT * FROM products WHERE type = 'game' AND console_by = 'PS5';

-- select all ps related product
SELECT * FROM products WHERE console_by = 'PS5' OR console_by = 'PS4';

SELECT * FROM wts WHERE products_id = 1 AND is_active = false AND depreciation_rate = 'b'

SELECT users_id, MAX(id) FROM wts WHERE products_id = 1 AND is_active = false GROUP BY users_id;

SELECT input_price_sell FROM wts WHERE id IN (950,742,865,984,926) ORDER BY input_price_sell ASC LIMIT 1;