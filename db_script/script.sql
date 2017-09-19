--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 9.6.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: dat_archeo_site; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE dat_archeo_site (
    id_archeo_site integer NOT NULL,
    fk_category smallint,
    fk_city smallint,
    rating smallint,
    time_to_visit smallint,
    data jsonb,
    _id character varying(100)
);


ALTER TABLE dat_archeo_site OWNER TO postgres;

--
-- Name: dat_archeo_site_id_Archeo_site_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "dat_archeo_site_id_Archeo_site_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "dat_archeo_site_id_Archeo_site_seq" OWNER TO postgres;

--
-- Name: dat_archeo_site_id_Archeo_site_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "dat_archeo_site_id_Archeo_site_seq" OWNED BY dat_archeo_site.id_archeo_site;


--
-- Name: dat_event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE dat_event (
    id_event bigint NOT NULL,
    fk_category smallint NOT NULL,
    fk_city smallint NOT NULL,
    rating smallint,
    time_to_visit smallint,
    data jsonb,
    _id character varying(800),
    txt_col tsvector
);


ALTER TABLE dat_event OWNER TO postgres;

--
-- Name: dat_event_id_event_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE dat_event_id_event_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dat_event_id_event_seq OWNER TO postgres;

--
-- Name: dat_event_id_event_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE dat_event_id_event_seq OWNED BY dat_event.id_event;


--
-- Name: dat_garden; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE dat_garden (
    id_garden integer NOT NULL,
    fk_category smallint NOT NULL,
    fk_city smallint NOT NULL,
    rating smallint,
    time_to_visit smallint,
    data jsonb,
    _id character varying(100)
);


ALTER TABLE dat_garden OWNER TO postgres;

--
-- Name: dat_garden_id_garden_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE dat_garden_id_garden_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dat_garden_id_garden_seq OWNER TO postgres;

--
-- Name: dat_garden_id_garden_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE dat_garden_id_garden_seq OWNED BY dat_garden.id_garden;


--
-- Name: dat_monument; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE dat_monument (
    id_monument integer NOT NULL,
    fk_category smallint,
    fk_city smallint,
    rating smallint,
    time_to_visit smallint,
    data jsonb,
    _id character varying
);


ALTER TABLE dat_monument OWNER TO postgres;

--
-- Name: dat_monument_id_monument_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE dat_monument_id_monument_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dat_monument_id_monument_seq OWNER TO postgres;

--
-- Name: dat_monument_id_monument_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE dat_monument_id_monument_seq OWNED BY dat_monument.id_monument;


--
-- Name: dat_museum; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE dat_museum (
    id_museum integer NOT NULL,
    fk_category smallint NOT NULL,
    fk_city smallint NOT NULL,
    rating smallint,
    time_to_visit smallint,
    data jsonb,
    _id character varying(100)
);


ALTER TABLE dat_museum OWNER TO postgres;

--
-- Name: dat_museum_id_museum_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE dat_museum_id_museum_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dat_museum_id_museum_seq OWNER TO postgres;

--
-- Name: dat_museum_id_museum_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE dat_museum_id_museum_seq OWNED BY dat_museum.id_museum;


--
-- Name: dat_restaurant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE dat_restaurant (
    id_restaurant integer NOT NULL,
    fk_category smallint NOT NULL,
    fk_city smallint NOT NULL,
    rating smallint,
    time_to_visit smallint,
    data jsonb,
    _id character varying(100)
);


ALTER TABLE dat_restaurant OWNER TO postgres;

--
-- Name: dat_restaurant_id_restaurant_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE dat_restaurant_id_restaurant_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE dat_restaurant_id_restaurant_seq OWNER TO postgres;

--
-- Name: dat_restaurant_id_restaurant_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE dat_restaurant_id_restaurant_seq OWNED BY dat_restaurant.id_restaurant;


--
-- Name: x_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE x_category (
    id_category character varying(2044) NOT NULL,
    category_it character varying NOT NULL,
    category_en character varying(100)
);


ALTER TABLE x_category OWNER TO postgres;

--
-- Name: x_category_id_category_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE x_category_id_category_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE x_category_id_category_seq OWNER TO postgres;

--
-- Name: x_category_id_category_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE x_category_id_category_seq OWNED BY x_category.id_category;


--
-- Name: x_city; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE x_city (
    id_city integer NOT NULL,
    city_it character varying(100) NOT NULL,
    city_en character varying(100) NOT NULL
);


ALTER TABLE x_city OWNER TO postgres;

--
-- Name: x_city_id_city_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE x_city_id_city_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE x_city_id_city_seq OWNER TO postgres;

--
-- Name: x_city_id_city_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE x_city_id_city_seq OWNED BY x_city.id_city;


--
-- Name: dat_archeo_site id_archeo_site; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY dat_archeo_site ALTER COLUMN id_archeo_site SET DEFAULT nextval('"dat_archeo_site_id_Archeo_site_seq"'::regclass);


--
-- Name: dat_event id_event; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY dat_event ALTER COLUMN id_event SET DEFAULT nextval('dat_event_id_event_seq'::regclass);


--
-- Name: dat_garden id_garden; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY dat_garden ALTER COLUMN id_garden SET DEFAULT nextval('dat_garden_id_garden_seq'::regclass);


--
-- Name: dat_monument id_monument; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY dat_monument ALTER COLUMN id_monument SET DEFAULT nextval('dat_monument_id_monument_seq'::regclass);


--
-- Name: dat_museum id_museum; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY dat_museum ALTER COLUMN id_museum SET DEFAULT nextval('dat_museum_id_museum_seq'::regclass);


--
-- Name: dat_restaurant id_restaurant; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY dat_restaurant ALTER COLUMN id_restaurant SET DEFAULT nextval('dat_restaurant_id_restaurant_seq'::regclass);


--
-- Name: x_category id_category; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY x_category ALTER COLUMN id_category SET DEFAULT nextval('x_category_id_category_seq'::regclass);


--
-- Name: x_city id_city; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY x_city ALTER COLUMN id_city SET DEFAULT nextval('x_city_id_city_seq'::regclass);


--
-- Name: dat_archeo_site dat_archeo_site_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY dat_archeo_site
    ADD CONSTRAINT dat_archeo_site_pkey PRIMARY KEY (id_archeo_site);


--
-- Name: dat_event dat_event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY dat_event
    ADD CONSTRAINT dat_event_pkey PRIMARY KEY (id_event);


--
-- Name: dat_garden dat_garden_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY dat_garden
    ADD CONSTRAINT dat_garden_pkey PRIMARY KEY (id_garden);


--
-- Name: dat_monument dat_monument_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY dat_monument
    ADD CONSTRAINT dat_monument_pkey PRIMARY KEY (id_monument);


--
-- Name: dat_museum dat_museum_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY dat_museum
    ADD CONSTRAINT dat_museum_pkey PRIMARY KEY (id_museum);


--
-- Name: x_category x_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY x_category
    ADD CONSTRAINT x_category_pkey PRIMARY KEY (id_category);


--
-- Name: x_city x_city_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY x_city
    ADD CONSTRAINT x_city_pkey PRIMARY KEY (id_city);


--
-- Name: archeo_site_t_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX archeo_site_t_idx ON dat_archeo_site USING gin ((((setweight(to_tsvector('simple'::regconfig, COALESCE((data ->> 'title'::text), ''::text)), 'A'::"char") || ''::tsvector) || setweight(to_tsvector('simple'::regconfig, COALESCE((data ->> 'description'::text), ''::text)), 'B'::"char"))));


--
-- Name: event_t_idx_2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX event_t_idx_2 ON dat_event USING gin ((((setweight(to_tsvector('simple'::regconfig, COALESCE((data ->> 'title'::text), ''::text)), 'A'::"char") || ''::tsvector) || setweight(to_tsvector('simple'::regconfig, COALESCE((data ->> 'description'::text), ''::text)), 'B'::"char"))));


--
-- Name: garden_t_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX garden_t_idx ON dat_garden USING gin ((((setweight(to_tsvector('simple'::regconfig, COALESCE((data ->> 'title'::text), ''::text)), 'A'::"char") || ''::tsvector) || setweight(to_tsvector('simple'::regconfig, COALESCE((data ->> 'description'::text), ''::text)), 'B'::"char"))));


--
-- Name: monument_t_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX monument_t_idx ON dat_monument USING gin ((((setweight(to_tsvector('simple'::regconfig, COALESCE((data ->> 'title'::text), ''::text)), 'A'::"char") || ''::tsvector) || setweight(to_tsvector('simple'::regconfig, COALESCE((data ->> 'description'::text), ''::text)), 'B'::"char"))));


--
-- Name: museum_t_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX museum_t_idx ON dat_museum USING gin ((((setweight(to_tsvector('simple'::regconfig, COALESCE((data ->> 'title'::text), ''::text)), 'A'::"char") || ''::tsvector) || setweight(to_tsvector('simple'::regconfig, COALESCE((data ->> 'description'::text), ''::text)), 'B'::"char"))));


--
-- Name: restaurant_t_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX restaurant_t_idx ON dat_restaurant USING gin (to_tsvector('simple'::regconfig, COALESCE((data ->> 'title'::text), ''::text)));


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

