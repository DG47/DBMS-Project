package io.infsci2710.autoapi.salesdetail;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Service
@AllArgsConstructor
public class SalesDetailService {

    @Autowired
    SalesDetailRepository repository;

    public Flux<SalesDetail> getAll() { return repository.findAll().switchIfEmpty(Flux.empty()); }

    public Mono<SalesDetail> getById(final String id) { return repository.findById(id).switchIfEmpty(Mono.empty()); }

}
