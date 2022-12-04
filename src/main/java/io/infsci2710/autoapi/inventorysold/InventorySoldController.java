package io.infsci2710.autoapi.inventorysold;

import io.infsci2710.autoapi.sales.Sales;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;


@RestController
@AllArgsConstructor
@RequestMapping("/inventory-sold")
public class InventorySoldController {

    @Autowired
    InventorySoldService service;

    @PostMapping("/transfer")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Mono<InventorySold> transfer(@RequestBody final InventorySold data) {
        System.out.println(data);
        return service.transfer(data);
    }



}
