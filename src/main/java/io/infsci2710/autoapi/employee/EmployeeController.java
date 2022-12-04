package io.infsci2710.autoapi.employee;


import io.infsci2710.autoapi.sales.Sales;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@RestController
@AllArgsConstructor
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    EmployeeService service;

    @Autowired
    EmployeeRepository repository;

    @GetMapping
    public Flux<Employee> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public Mono<Employee> getById(@PathVariable("id") final String id) { return service.getById(id); }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Mono<Employee> save(@RequestBody final Employee data) { return service.save(data); }

    @PostMapping("/{id}")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Mono<Employee> update(@PathVariable("id") final String id, @RequestBody final Employee data) { return service.save(data); }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public Mono delete(@PathVariable final String id) { return service.delete(id); }

}
