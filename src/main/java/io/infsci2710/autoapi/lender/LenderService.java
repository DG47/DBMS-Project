package io.infsci2710.autoapi.lender;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@AllArgsConstructor
public class LenderService {

    @Autowired
    LenderRepository repository;

    public Flux<Lender> getAll() { return repository.findAll().switchIfEmpty(Flux.empty()); }


}
