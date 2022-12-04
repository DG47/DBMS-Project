package io.infsci2710.autoapi.inventorysold;

import io.infsci2710.autoapi.inventory.Inventory;
import org.springframework.data.repository.reactive.ReactiveSortingRepository;
import org.springframework.stereotype.Repository;

    @Repository
    public interface InventorySoldRepository extends ReactiveSortingRepository<InventorySold, String> {

    }
