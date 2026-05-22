-- ============================================================
--  Parameter tables
-- ============================================================

CREATE TABLE address_type_params (
    id          INT             NOT NULL AUTO_INCREMENT,
    /*text        VARCHAR(60)     NOT NULL,
    code        VARCHAR(20)     NOT NULL,*/
    i18n_id     INT             NOT NULL,
    erased      TINYINT(1)      NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE phone_type_params (
    id          INT             NOT NULL AUTO_INCREMENT,
    /*text        VARCHAR(60)     NOT NULL,
    code        VARCHAR(20)     NOT NULL,*/
    i18n_id     INT             NOT NULL,
    erased      TINYINT(1)      NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

-- ============================================================
--  States and cities
-- ============================================================

CREATE TABLE states_params (
    id          INT             NOT NULL AUTO_INCREMENT,
    text        VARCHAR(100)    NOT NULL,
    uf          CHAR(2)         NOT NULL,
    erased      TINYINT(1)      NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE cities_params (
    id          INT             NOT NULL AUTO_INCREMENT,
    id_state    INT             NOT NULL,
    text        VARCHAR(100)    NOT NULL,
    ibge_code   CHAR(7)             NULL,
    erased      TINYINT(1)      NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    CONSTRAINT fk_city_state
        FOREIGN KEY (id_state) REFERENCES states_params (id)
);

-- ============================================================
--  Main table
-- ============================================================

CREATE TABLE clients (
    id              INT             NOT NULL AUTO_INCREMENT,
    name            VARCHAR(150)    NOT NULL,
    email           VARCHAR(150)    NOT NULL,
    cpf_cnpj        VARCHAR(18)         NULL,
    person_type     CHAR(1)         NOT NULL DEFAULT 'F',  -- F = Física, J = Jurídica
    birth_date      DATE                NULL,
    active          TINYINT(1)      NOT NULL DEFAULT 1,
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at      TIMESTAMP       NULL DEFAULT NULL,
    erased          TINYINT(1)      NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TRIGGER TR_clients_update_deleted_at
BEFORE UPDATE ON clients
FOR EACH ROW
BEGIN
  IF NEW.erased = 1 AND OLD.erased = 0 THEN
    SET NEW.deleted_at = NOW();
  END IF;

  IF NEW.erased = 0 THEN
    SET NEW.deleted_at = NULL;
  END IF;
END;

-- ============================================================
--  Addresses
-- ============================================================

CREATE TABLE client_addresses (
    id              INT             NOT NULL AUTO_INCREMENT,
    id_client       INT             NOT NULL,
    id_address_type INT                 NULL,
    street          VARCHAR(200)    NOT NULL,
    number          VARCHAR(10)         NULL,
    complement      VARCHAR(100)        NULL,
    reference       VARCHAR(150)        NULL,
    zip_code        CHAR(8)             NULL,
    id_city         INT                 NULL,
    id_state        INT                 NULL,
    erased          TINYINT(1)      NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    CONSTRAINT fk_addr_client
        FOREIGN KEY (id_client)       REFERENCES clients (id),
    CONSTRAINT fk_addr_type
        FOREIGN KEY (id_address_type) REFERENCES address_type_params (id),
    CONSTRAINT fk_addr_city
        FOREIGN KEY (id_city)         REFERENCES cities_params (id),
    CONSTRAINT fk_addr_state
        FOREIGN KEY (id_state)        REFERENCES states_params (id)
);

-- ============================================================
--  Phones
-- ============================================================

CREATE TABLE client_phones (
    id              INT             NOT NULL AUTO_INCREMENT,
    id_client       INT             NOT NULL,
    id_phone_type   INT                 NULL,
    number          VARCHAR(20)     NOT NULL,
    main            TINYINT(1)      NOT NULL DEFAULT 0,
    erased          TINYINT(1)      NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    CONSTRAINT fk_phone_client
        FOREIGN KEY (id_client)    REFERENCES clients (id),
    CONSTRAINT fk_phone_type
        FOREIGN KEY (id_phone_type) REFERENCES phone_type_params (id)
);

-- ============================================================
--  Seed data — parameters
-- ============================================================

INSERT INTO parameter_translation (text, lang, i18n_id, namespace, erased) VALUES
-- BILLING
('Cobrança / Faturamento', 'pt_BR', 4, 'address_type_params', 0),
('Billing', 'en', 4, 'address_type_params', 0),
('Rechnungsadresse', 'de', 4, 'address_type_params', 0),
('Facturación', 'es', 4, 'address_type_params', 0),

-- DELIVERY
('Entrega', 'pt_BR', 5, 'address_type_params', 0),
('Delivery', 'en', 5, 'address_type_params', 0),
('Lieferadresse', 'de', 5, 'address_type_params', 0),
('Entrega', 'es', 5, 'address_type_params', 0),

-- NONE
('Sem classificação', 'pt_BR', 6, 'address_type_params', 0),
('Unclassified', 'en', 6, 'address_type_params', 0),
('Nicht klassifiziert', 'de', 6, 'address_type_params', 0),
('Sin clasificación', 'es', 6, 'address_type_params', 0);

/*
INSERT INTO address_type_params (text, code) VALUES
    ('Cobrança / Faturamento', 'BILLING'),
    ('Entrega',                'DELIVERY'),
    ('Sem classificação',      'NONE');
*/

INSERT INTO parameter_translation (text, lang, i18n_id, namespace, erased) VALUES
-- MOBILE
('Celular', 'pt_BR', 1, 'phone_type_params', 0),
('Mobile', 'en', 1, 'phone_type_params', 0),
('Handy', 'de', 1, 'phone_type_params', 0),
('Celular', 'es', 1, 'phone_type_params', 0),

-- LANDLINE
('Fixo', 'pt_BR', 2, 'phone_type_params', 0),
('Landline', 'en', 2, 'phone_type_params', 0),
('Festnetz', 'de', 2, 'phone_type_params', 0),
('Teléfono fijo', 'es', 2, 'phone_type_params', 0),

-- BUSINESS
('Comercial', 'pt_BR', 3, 'phone_type_params', 0),
('Business', 'en', 3, 'phone_type_params', 0),
('Geschäftlich', 'de', 3, 'phone_type_params', 0),
('Comercial', 'es', 3, 'phone_type_params', 0);

/*
INSERT INTO phone_type_params (text, code) VALUES
    ('Celular',   'MOBILE'),
    ('Fixo',      'LANDLINE'),
    ('Comercial', 'BUSINESS');
*/


-- ============================================================
--  REPORT TEMPLATE
-- ============================================================
    
CREATE TABLE `clients_report_templates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `html` text COLLATE utf8mb4_general_ci,
  `erased` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE clients_footer_templates (
	id INT auto_increment NOT NULL,
	html TEXT DEFAULT NULL NULL,
	erased TINYINT(1) DEFAULT 0 NULL,
	CONSTRAINT `PRIMARY` PRIMARY KEY (id)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE systems.clients_header_templates (
	id int auto_increment NOT NULL,
	html text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
	erased tinyint(1) DEFAULT 0 NULL,
	CONSTRAINT `PRIMARY` PRIMARY KEY (id)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE systems.parameter_translation (
	id INT auto_increment NOT NULL,
	text varchar(255) NOT NULL,
	lang varchar(10) NOT NULL,
	i18n_id INT NOT NULL,
	namespace varchar(100) NOT NULL,
	erased TINYINT(1) DEFAULT 0 NOT NULL,
	CONSTRAINT parameter_translation_pk PRIMARY KEY (id)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE UNIQUE INDEX parameter_translation_i18n_id_IDX USING BTREE ON systems.parameter_translation (i18n_id,lang);


