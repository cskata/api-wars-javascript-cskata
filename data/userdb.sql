ALTER TABLE IF EXISTS ONLY public.registered_users DROP CONSTRAINT IF EXISTS registered_users_pk CASCADE;
ALTER TABLE IF EXISTS ONLY public.planet_votes DROP CONSTRAINT IF EXISTS planet_votes_pk CASCADE;
ALTER TABLE IF EXISTS ONLY public.planet_votes DROP CONSTRAINT IF EXISTS fk_user_id CASCADE;

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


DROP TABLE IF EXISTS planet_votes;
DROP SEQUENCE IF EXISTS planet_votes_id_seq;

CREATE TABLE planet_votes (
    id integer NOT NULL,
    planet_id integer NOT NULL,
    planet_name character varying(255) NOT NULL,
    user_id integer NOT NULL,
    submission_time timestamp without time zone
);

CREATE SEQUENCE planet_votes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE ONLY planet_votes ALTER COLUMN id SET DEFAULT nextval('planet_votes_id_seq'::regclass);

ALTER TABLE ONLY planet_votes
    ADD CONSTRAINT planet_votes_pk PRIMARY KEY (id);

ALTER TABLE ONLY planet_votes
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES registered_users(id);