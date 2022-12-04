package io.infsci2710.autoapi.salesperson;


import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface SalespersonRepository extends R2dbcRepository<Salesperson, String> {

    public Flux<Salesperson> findAllByDealershipIdEqualsOrderByName(String dealershipId);

}
