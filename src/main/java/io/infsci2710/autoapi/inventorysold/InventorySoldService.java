package io.infsci2710.autoapi.inventorysold;


import io.infsci2710.autoapi.customer.CustomerService;
import io.infsci2710.autoapi.inventory.Inventory;
import io.infsci2710.autoapi.inventory.InventoryService;
import io.infsci2710.autoapi.sales.Sales;
import io.infsci2710.autoapi.sales.SalesService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
@AllArgsConstructor
public class InventorySoldService {

    @Autowired
    InventorySoldRepository repository;

    @Autowired
    InventoryService inventoryService;

    @Autowired
    CustomerService customerService;

    @Autowired
    SalesService salesService;

    public Mono<InventorySold> transfer(InventorySold tuple) {
        String vin = tuple.getVin();
        return inventoryService.delete(vin).then(repository.save(tuple));
    }


}
