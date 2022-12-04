package io.infsci2710.autoapi.employee;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("employee")
public class Employee {

    @Id
    @Column
    private int id;

    @Column
    private String fist_name;

    @Column
    private String last_name;

    @Column
    private String address_street;

    @Column
    private String address_city;

    @Column
    private String address_state;

    @Column
    private int address_zip;

    @Column
    private String gender;

    @Column
    private int age;

    @Column
    private String title;

    @Column
    private int salary;

    @Column
    private int dealership_id;

}
