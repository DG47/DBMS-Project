package io.infsci2710.autoapi.inventorysold;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.ReadOnlyProperty;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("vehicle_sold")
public class InventorySold {

    @Id
    @Column
    private int id;

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
    private String color;

    @Column
    private String transmission;

    @Column
    private String drive;

    @Column
    private String fuel;

}
