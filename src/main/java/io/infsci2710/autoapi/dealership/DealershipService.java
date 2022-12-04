package io.infsci2710.autoapi.dealership;

import io.infsci2710.autoapi.employee.Employee;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Service
@AllArgsConstructor
public class DealershipService {

    @Autowired
    DealershipRepository repository;

    public Flux<Dealership> getAll() { return repository.findAll().switchIfEmpty(Flux.empty()); }

    public Mono<Dealership> getById(final String id) { return repository.findById(id).switchIfEmpty(Mono.empty()); }

    public Mono<Dealership> save(Dealership tuple) { return repository.save(tuple); }

    public Mono<Dealership> update(Dealership tuple) { return repository.save(tuple); }

    public Mono<Dealership> delete(final String id) {
        final Mono<Dealership> dbObj = getById(id);
        if (Objects.isNull(dbObj)) {
            return Mono.empty();
        }
        return getById(id).switchIfEmpty(Mono.empty()).filter(Objects::nonNull).flatMap(tupleToDelete ->
                repository.delete(tupleToDelete).then(Mono.just(tupleToDelete)));
    }

}
