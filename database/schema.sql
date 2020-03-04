-- NOTE: This schema was exported from the Heroku hosted database. If this database
--  needs to be recreated somewhere else, or to a different heroku database, change 
-- the database name, the user id, and the schema name as needed. Sincerely, Quentin

-- Database: d11mk447psvodn -- this is the database name. change it if needed

-- DROP DATABASE d11mk447psvodn;

-- CREATE DATABASE d11mk447psvodn
--     WITH 
--     OWNER = rtzcqcuwrluffd -- This is the user id. Change it if needed
--     ENCODING = 'UTF8'
--     LC_COLLATE = 'en_US.UTF-8'
--     LC_CTYPE = 'en_US.UTF-8'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1;

-- GRANT ALL ON DATABASE d11mk447psvodn TO rtzcqcuwrluffd;

-- SCHEMA: public  -- this is the schema name. Change it if needed. Also change it everywhere it appears in this file

-- DROP SCHEMA public ;

-- CREATE SCHEMA public
--     AUTHORIZATION tgeuyrxmvtewzl;

-- COMMENT ON SCHEMA public
--     IS 'standard public schema';

GRANT ALL ON SCHEMA public TO PUBLIC;

GRANT ALL ON SCHEMA public TO tgeuyrxmvtewzl;

-- Table: public.esend_fee_and_fx_rate

DROP TABLE IF EXISTS public.esend_fee_and_fx_rate;

CREATE TABLE public.esend_fee_and_fx_rate
(
    mt_fee numeric(7,4) NOT NULL DEFAULT 0.00,
    mt_markup numeric(7,4)
)

TABLESPACE pg_default;

ALTER TABLE public.esend_fee_and_fx_rate
    OWNER to tgeuyrxmvtewzl;


-- Table: public.recipients

DROP TABLE IF EXISTS public.recipients;

CREATE TABLE public.recipients
(
    id integer NOT NULL DEFAULT nextval('recipients_id_seq'::regclass),
    first_name text COLLATE pg_catalog."default" NOT NULL,
    last_name text COLLATE pg_catalog."default" NOT NULL,
    clabe_number text COLLATE pg_catalog."default",
    CONSTRAINT recipients_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.recipients
    OWNER to tgeuyrxmvtewzl;


-- Table: public.ripple_quote_element_fx_rate

DROP TABLE IF EXISTS public.ripple_quote_element_fx_rate;

CREATE TABLE public.ripple_quote_element_fx_rate
(
    rate numeric,
    base_currency_code text COLLATE pg_catalog."default",
    counter_currency_code text COLLATE pg_catalog."default",
    type text COLLATE pg_catalog."default",
    id integer NOT NULL DEFAULT nextval('ripple_quote_element_fx_rate_id_seq'::regclass),
    fk_quote_element_id text COLLATE pg_catalog."default",
    CONSTRAINT ripple_quote_element_fx_rate_pkey PRIMARY KEY (id),
    CONSTRAINT fk_quote_element_id_is_unique UNIQUE (fk_quote_element_id),
    CONSTRAINT fk_quote_element_id_fkey FOREIGN KEY (fk_quote_element_id)
        REFERENCES public.ripple_quote_elements (quote_element_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.ripple_quote_element_fx_rate
    OWNER to tgeuyrxmvtewzl;


-- Table: public.ripple_quote_elements

DROP TABLE IF EXISTS public.ripple_quote_elements;

CREATE TABLE public.ripple_quote_elements
(
    quote_element_id text COLLATE pg_catalog."default" NOT NULL,
    fk_quote_id text COLLATE pg_catalog."default" NOT NULL,
    quote_element_type text COLLATE pg_catalog."default",
    quote_element_order text COLLATE pg_catalog."default",
    sender_address text COLLATE pg_catalog."default",
    receiver_address text COLLATE pg_catalog."default",
    sending_amount numeric,
    receiving_amount numeric,
    sending_fee numeric,
    receiving_fee numeric,
    sending_currency_code text COLLATE pg_catalog."default",
    receiving_currency_code text COLLATE pg_catalog."default",
    transfer_currency_code numeric,
    CONSTRAINT ripple_quote_elements_pkey PRIMARY KEY (quote_element_id),
    CONSTRAINT ripple_quote_elements_fk_quote_id_fkey FOREIGN KEY (fk_quote_id)
        REFERENCES public.ripple_quotes (quote_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.ripple_quote_elements
    OWNER to tgeuyrxmvtewzl;

-- Table: public.ripple_quotes

DROP TABLE IF EXISTS public.ripple_quotes;

CREATE TABLE public.ripple_quotes
(
    quote_id text COLLATE pg_catalog."default" NOT NULL,
    created_at text COLLATE pg_catalog."default",
    type text COLLATE pg_catalog."default",
    amount numeric(10,4),
    currency_code text COLLATE pg_catalog."default",
    fk_transaction_id integer NOT NULL,
    CONSTRAINT ripple_quotes_pkey PRIMARY KEY (quote_id),
    CONSTRAINT fk_transaction_id_is_unique UNIQUE (fk_transaction_id),
    CONSTRAINT fk_transaction_id FOREIGN KEY (fk_transaction_id)
        REFERENCES public.transactions (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.ripple_quotes
    OWNER to tgeuyrxmvtewzl;


-- Table: public.senders

DROP TABLE IF EXISTS public.senders;

CREATE TABLE public.senders
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    first_name text COLLATE pg_catalog."default",
    last_name text COLLATE pg_catalog."default",
    google_profile_id text COLLATE pg_catalog."default" NOT NULL,
    joined timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT senders_pkey PRIMARY KEY (id),
    CONSTRAINT google_profile_id_is_unique UNIQUE (google_profile_id)
)

TABLESPACE pg_default;

ALTER TABLE public.senders
    OWNER to tgeuyrxmvtewzl;


-- Table: public.transactions

DROP TABLE IF EXISTS public.transactions;

CREATE TABLE public.transactions
(
    id integer NOT NULL DEFAULT nextval('transactions_id_seq'::regclass),
    fk_sender_id integer NOT NULL,
    fk_recipient_id integer NOT NULL,
    "timestamp" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    esend_mt_fee numeric(7,4) NOT NULL DEFAULT 0.00,
    esend_mt_fx_rate_usdmxn numeric(7,4) NOT NULL DEFAULT 0.00,
    total_usd numeric(8,4),
    CONSTRAINT transactions_pkey PRIMARY KEY (id),
    CONSTRAINT link_recipient_info FOREIGN KEY (fk_recipient_id)
        REFERENCES public.recipients (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT link_sender_info FOREIGN KEY (fk_sender_id)
        REFERENCES public.senders (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE public.transactions
    OWNER to tgeuyrxmvtewzl;