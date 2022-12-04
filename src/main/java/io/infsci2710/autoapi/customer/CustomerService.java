package io.infsci2710.autoapi.customer;

import io.infsci2710.autoapi.dealership.Dealership;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Service
@AllArgsConstructor
public class CustomerService {

    @Autowired
    CustomerRepository repository;

    public Flux<Customer> getAll() { return repository.findAll().switchIfEmpty(Flux.empty()); }

    public Mono<Customer> getById(final String id) { return repository.findById(id).switchIfEmpty(Mono.empty()); }

    public Mono<Customer> save(Customer tuple) { return repository.save(tuple); }

    public Mono<Customer> update(Customer tuple) { return repository.save(tuple); }

    public Mono<Customer> delete(final String id) {
        final Mono<Customer> dbObj = getById(id);
        if (Objects.isNull(dbObj)) {
            return Mono.empty();
        }
        return getById(id).switchIfEmpty(Mono.empty()).filter(Objects::nonNull).flatMap(tupleToDelete ->
                repository.delete(tupleToDelete).then(Mono.just(tupleToDelete)));
    }

}
