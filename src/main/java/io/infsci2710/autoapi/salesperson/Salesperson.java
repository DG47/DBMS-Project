package io.infsci2710.autoapi.salesperson;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("v_sales_person")
public class Salesperson {

    @Id
    @Column
    private int id;

    @Column
    private String name;

    @Column("dealership_id")
    private int dealershipId;


}
