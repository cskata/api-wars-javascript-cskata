DROP TABLE IF EXISTS registered_users;
DROP SEQUENCE IF EXISTS registered_users_id_seq;

CREATE TABLE registered_users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    hashed_pw character varying(255) NOT NULL,
    reg_date timestamp without time zone
);

CREATE SEQUENCE registered_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ONLY registered_users ALTER COLUMN id SET DEFAULT nextval('registered_users_id_seq'::regclass);

ALTER TABLE ONLY registered_users
    ADD CONSTRAINT registered_users_pk PRIMARY KEY (id);

ALTER TABLE ONLY registered_users
    ADD CONSTRAINT username_uk UNIQUE (username);