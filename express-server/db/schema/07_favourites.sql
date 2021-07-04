DROP TABLE IF EXISTS favourites CASCADE;

CREATE TABLE favourites
(
  user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  car_id integer NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, car_id)
);