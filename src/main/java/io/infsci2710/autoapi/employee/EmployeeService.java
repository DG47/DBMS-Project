package io.infsci2710.autoapi.employee;

import io.infsci2710.autoapi.inventory.Inventory;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Service
@AllArgsConstructor
public class EmployeeService {

    @Autowired
    EmployeeRepository repository;

    public Flux<Employee> getAll() { return repository.findAll().switchIfEmpty(Flux.empty()); }

    public Mono<Employee> getById(final String id) { return repository.findById(id).switchIfEmpty(Mono.empty()); }

    public Mono<Employee> save(Employee tuple) { return repository.save(tuple); }

    public Mono<Employee> update(Employee tuple) { return repository.save(tuple); }

    public Mono<Employee> delete(final String id) {
        final Mono<Employee> dbObj = getById(id);
        if (Objects.isNull(dbObj)) {
            return Mono.empty();
        }
        return getById(id).switchIfEmpty(Mono.empty()).filter(Objects::nonNull).flatMap(tupleToDelete ->
                repository.delete(tupleToDelete).then(Mono.just(tupleToDelete)));
    }

}
