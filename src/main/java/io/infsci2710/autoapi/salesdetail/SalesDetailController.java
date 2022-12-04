package io.infsci2710.autoapi.salesdetail;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@RestController
@AllArgsConstructor
@RequestMapping("/sales-detail")
public class SalesDetailController {

    @Autowired
    SalesDetailService service;

    @Autowired
    SalesDetailRepository repository;

    @GetMapping
    public Flux<SalesDetail> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public Mono<SalesDetail> getById(@PathVariable("id") final String id) { return service.getById(id); }

    @GetMapping("agg/sales-person")
    public Flux<SalesPersonAgg> getAggBySalesPerson() {
        return repository.getAggBySalesPerson();
    }

    @GetMapping("agg/dealership")
    public Flux<DealershipAgg> getAggByDealership() {
        return repository.getAggByDealership();
    }

    @GetMapping("agg/region")
    public Flux<RegionAgg> getAggByRegion() {
        return repository.getAggByRegion();
    }

    @GetMapping("agg/lender")
    public Flux<LenderAgg> getAggByLender() {
        return repository.getAggByLender();
    }

}
