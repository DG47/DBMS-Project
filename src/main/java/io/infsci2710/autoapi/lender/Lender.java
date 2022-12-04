package io.infsci2710.autoapi.lender;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("lender")
public class Lender {


    @Id
    @Column
    private String id;

    @Column
    private String lender_name;

    @Column
    private String address_street;

    @Column
    private String address_city;

    @Column
    private String address_state;

    @Column
    private int address_zip;

}
