package io.infsci2710.autoapi.loan;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Service
@AllArgsConstructor
public class LoanService {

    @Autowired
    LoanRepository repository;

    public Flux<Loan> getAll() { return repository.findAll().switchIfEmpty(Flux.empty()); }

    public Mono<Loan> save(Loan tuple) {
        System.out.println(tuple);
        System.out.println(tuple.getSale_id());
        return repository.saveLoan(tuple.getId(), tuple.getPrincipal(), tuple.getApr(), tuple.getDuration(), tuple.getLender_id(), tuple.getSale_id(), tuple.getCustomer_id());
    }

}
