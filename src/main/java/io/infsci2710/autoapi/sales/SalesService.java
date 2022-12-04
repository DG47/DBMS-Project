package io.infsci2710.autoapi.sales;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Service
@AllArgsConstructor
public class SalesService {

    @Autowired
    SalesRepository repository;

    public Flux<Sales> getAll() { return repository.findAll().switchIfEmpty(Flux.empty()); }

    public Mono<Sales> getById(final String id) { return repository.findById(id).switchIfEmpty(Mono.empty()); }

    public Mono<Sales> save(Sales tuple) { return repository.save(tuple); }

    public Mono<Sales> update(Sales tuple) { return repository.save(tuple); }

    public Mono<Sales> delete(final String id) {
        final Mono<Sales> dbObj = getById(id);
        if (Objects.isNull(dbObj)) {
            return Mono.empty();
        }
        return getById(id).switchIfEmpty(Mono.empty()).filter(Objects::nonNull).flatMap(tupleToDelete ->
                repository.delete(tupleToDelete).then(Mono.just(tupleToDelete)));
    }

}
