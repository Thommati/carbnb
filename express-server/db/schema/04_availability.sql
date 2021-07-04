DROP TABLE IF EXISTS availability CASCADE;

CREATE TABLE availability
(
  id SERIAL NOT NULL PRIMARY KEY,
  location_id INTEGER NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  delivery BOOLEAN NOT NULL,
  car_id INTEGER NOT NULL,
  price MONEY NOT NULL
);