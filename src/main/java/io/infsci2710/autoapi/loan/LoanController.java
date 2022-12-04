package io.infsci2710.autoapi.loan;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@RestController
@AllArgsConstructor
@RequestMapping("/loan")
public class LoanController {

    @Autowired
    LoanService service;

    @GetMapping
    public Flux<Loan> getAll() { return service.getAll(); }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Mono<Loan> save(@RequestBody final Loan data) { return service.save(data); }

}
