package io.infsci2710.autoapi.salesdetail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table("v_sales_detail")
public class LenderAgg {

    @Column
    private String lender_name;

    @Column
    private String cnt;

    @Column
    private String avg;

    @Column
    private String max;

    @Column
    private String min;

}

