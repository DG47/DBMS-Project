package io.infsci2710.autoapi.salesdetail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("v_sales_detail")
public class SalesDetail {

    @Id
    @Column
    private int sale_id;

    @Column
    private String vehicle_vin;

    @Column
    private Timestamp transaction_date;

    @Column
    private int sale_price;

    @Column
    private int down_payment;

    @Column
    private String loan_id;

    @Column
    private int principal;

    @Column
    private int duration;

    @Column
    private double apr;

    @Column
    private String lender_name;

    @Column
    private String dealership_city;

    @Column
    private int dealership_zip;

    @Column
    private String region_name;

    @Column
    private String make;

    @Column
    private String model;

    @Column
    private int model_year;

    @Column
    private Timestamp invoice_date;

    @Column
    private String customer_name;

    @Column
    private String sales_person;

    @Column
    private String dealership_manager;

    @Column
    private String regional_manager;


}
