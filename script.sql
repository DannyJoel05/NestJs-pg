SELECT * FROM rrftiden WHERE tiden_cod_tiden = 1

drop table rrftiden

CREATE TABLE rrftiden (
  tiden_cod_tiden SERIAL PRIMARY KEY,
  tiden_name_tiden VARCHAR(255) NOT NULL,
  tiden_desc_tiden TEXT
);

INSERT INTO rrftiden (tiden_name_tiden, tiden_desc_tiden) VALUES
('Cédula', 'Documento de identificación personal');