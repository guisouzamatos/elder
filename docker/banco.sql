create sequence seq_category
    as integer;

alter sequence seq_category owner to gestao;

create sequence seq_supplier
    as integer;

alter sequence seq_supplier owner to gestao;

create sequence seq_product
    as integer;

alter sequence seq_product owner to gestao;

create sequence seq_sale
    as integer;

alter sequence seq_sale owner to gestao;

create sequence seq_stock
    as integer;

alter sequence seq_stock owner to gestao;

create table if not exists tb_category
(
    id_category integer default nextval('seq_category'::regclass) not null
    primary key,
    description varchar(255)                                      not null
    );

alter table tb_category
    owner to gestao;

alter sequence seq_category owned by tb_category.id_category;

create table if not exists tb_supplier
(
    id_supplier integer default nextval('seq_supplier'::regclass) not null
    primary key,
    name        varchar(255)                                      not null,
    contact     varchar(255)                                      not null
    );

alter table tb_supplier
    owner to gestao;

alter sequence seq_supplier owned by tb_supplier.id_supplier;

create table if not exists tb_product
(
    id_product  integer default nextval('seq_product'::regclass) not null
    primary key,
    description varchar(255)                                     not null,
    price       numeric(10, 2)                                   not null,
    category_id integer                                          not null
    references tb_category,
    supplier_id integer                                          not null
    references tb_supplier
    );

alter table tb_product
    owner to gestao;

alter sequence seq_product owned by tb_product.id_product;

create table if not exists tb_sale
(
    id_sale     integer default nextval('seq_sale'::regclass) not null
    primary key,
    total_value numeric(10, 2)                                not null,
    sale_date   timestamp
    );

alter table tb_sale
    owner to gestao;

alter sequence seq_sale owned by tb_sale.id_sale;

create table if not exists tb_stock
(
    id_stock    integer default nextval('seq_stock'::regclass) not null
    primary key,
    product_id  integer                                        not null
    references tb_product,
    quantity    integer                                        not null,
    total_value numeric(10, 2)                                 not null
    );

alter table tb_stock
    owner to gestao;

alter sequence seq_stock owned by tb_stock.id_stock;

create table if not exists tb_sale_products
(
    product_id integer not null
    constraint tb_sale_products_product
    references tb_product,
    sale_id    integer not null
    constraint tb_sale_products_sale
    references tb_sale,
    quantity   integer not null
);

alter table tb_sale_products
    owner to gestao;

alter table tb_stock
add column addition boolean;

