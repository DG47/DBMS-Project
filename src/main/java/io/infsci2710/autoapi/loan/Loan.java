package io.infsci2710.autoapi.loan;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("loan")
public class Loan {


    @Column
    private String id;

    @Column
    private int principal;

    @Column
    private double apr;

    @Column
    private int duration;

    @Column
    private int lender_id;

    @Column
    private int sale_id;

    @Column
    private int customer_id;

}
