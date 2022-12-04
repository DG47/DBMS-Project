package io.infsci2710.autoapi.sales;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@RestController
@AllArgsConstructor
@RequestMapping("/sales")
public class SalesController {

    @Autowired
    SalesService service;

    @GetMapping
    public Flux<Sales> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public Mono<Sales> getById(@PathVariable("id") final String id) { return service.getById(id); }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Mono<Sales> save(@RequestBody final Sales data) { return service.save(data); }

    @PostMapping("/{id}")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Mono<Sales> update(@PathVariable("id") final String id, @RequestBody final Sales data) { return service.save(data); }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public Mono delete(@PathVariable final String id) { return service.delete(id); }

}
