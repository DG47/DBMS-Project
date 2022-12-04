package io.infsci2710.autoapi.salesperson;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;


@RestController
@AllArgsConstructor
@RequestMapping("/salesperson")
public class SalespersonController {

    @Autowired
    SalespersonRepository repository;

    @GetMapping
    public Flux<Salesperson> getAll() { return repository.findAll(); }

    @GetMapping("/{id}")
    public Flux<Salesperson> getById(@PathVariable("id") final String id) { return repository.findAllByDealershipIdEqualsOrderByName(id); }


}
