package io.infsci2710.autoapi.inventory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.beans.Transient;
import java.sql.Timestamp;
import java.time.LocalDateTime;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("vehicle_inventory")
public class Inventory {

    @Id
    @Column
    private String vin;

    @Column
    private String make;

    @Column
    private String model;

    @Column
    private int model_year;

    @Column
    private String engine;

    @Column
    private int mileage;

    @Column
    private int price;

    @Column
    private String color;

    @Column
    private String transmission;

    @Column
    private String drive;

    @Column
    private String fuel;

    @Column("dealership_id")
    private int dealershipId;

    @ReadOnlyProperty
    private Timestamp invoice_date;

}
