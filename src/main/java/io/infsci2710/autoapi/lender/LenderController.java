package io.infsci2710.autoapi.lender;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@RestController
@AllArgsConstructor
@RequestMapping("/lender")
public class LenderController {

    @Autowired
    LenderService service;

    @GetMapping
    public Flux<Lender> getAll() { return service.getAll(); }

}
