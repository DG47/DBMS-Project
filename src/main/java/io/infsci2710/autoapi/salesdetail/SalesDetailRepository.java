package io.infsci2710.autoapi.salesdetail;


import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface SalesDetailRepository extends R2dbcRepository<SalesDetail, String> {

    @Query("select sales_person, count(sale_price) as cnt, avg(sale_price) as avg, max(sale_price) as max, min(sale_price) as min from v_sales_detail group by sales_person order by 1")
    Flux<SalesPersonAgg> getAggBySalesPerson();

    @Query("select dealership_manager, dealership_city, count(sale_price) as cnt, avg(sale_price) as avg, max(sale_price) as max, min(sale_price) as min from v_sales_detail group by dealership_manager, dealership_city order by 1 desc;")
    Flux<DealershipAgg> getAggByDealership();

    @Query("select region_name, count(sale_price) as cnt, avg(sale_price) as avg, max(sale_price) as max, min(sale_price) as min from v_sales_detail group by region_name order by 1")
    Flux<RegionAgg> getAggByRegion();

    @Query("select lender_name, count(sale_price) as cnt, avg(sale_price) as avg, max(sale_price) as max, min(sale_price) as min from v_sales_detail group by lender_name order by 1")
    Flux<LenderAgg> getAggByLender();

}

