package io.infsci2710.autoapi.sales;

import lombok.AllArgsConstructor;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Date;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("sales")
public class Sales {

    @Id
    @Column
    private int id;

    @Column
    private int vehicle_sold_id;

    @ReadOnlyProperty
    private Timestamp transaction_date;

    @Column
    private int sales_person_id;

    @Column
    private int customer_id;

    @Column
    private int dealership_id;

    @Column
    private int sale_price;

    @Column
    private int down_payment;

}
