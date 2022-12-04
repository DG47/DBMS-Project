package io.infsci2710.autoapi.dealership;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("dealership")
public class Dealership {

    @Id
    @Column
    private int id;

    @Column
    private String address_street;

    @Column
    private String address_city;

    @Column
    private String address_state;

    @Column
    private int address_zip;

    @Column
    private int manager_employee_id;

}
