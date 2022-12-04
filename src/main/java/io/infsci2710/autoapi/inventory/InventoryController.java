package io.infsci2710.autoapi.inventory;


import io.infsci2710.autoapi.inventorysold.InventorySold;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletRequest;


@RestController
@AllArgsConstructor
@RequestMapping("/inventory")
public class InventoryController {

    @Autowired
    InventoryService service;

    @Autowired
    InventoryRepository repository;


    @GetMapping("/all")
    public Flux<Inventory> getAll() { return repository.findAll(); };

    @GetMapping
    public Mono<Page<Inventory>> getByPrice(
            @RequestParam("page") int page,
            @RequestParam("size") int size,
            @RequestParam("minPrice") int minPrice,
            @RequestParam("maxPrice") int maxPrice,
            @RequestParam("minMileage") int minMileage,
            @RequestParam("maxMileage") int maxMileage,
            @RequestParam("transmissionToggle") String transmissionToggle,
            @RequestParam("driveToggle") String driveToggle,
            @RequestParam("fuelToggle") String fuelToggle,
            @RequestParam("dealershipToggle") String dealershipToggle,
            @RequestParam("sortBy") String sortBy,
            @RequestParam("sortDir") String sortDir,
            @RequestParam("make") String make,
            HttpServletRequest request
    ) {

        Sort sort = (sortDir.equals("asc")) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        if (make.equals("All")) {
            return service.findAllBy(PageRequest.of(page, size, sort), minPrice, maxPrice, minMileage, maxMileage, transmissionToggle, driveToggle, fuelToggle, dealershipToggle);
        }
        return service.findAllByMake(PageRequest.of(page, size, sort), minPrice, maxPrice, minMileage, maxMileage, transmissionToggle, driveToggle, fuelToggle, dealershipToggle, make);
    }
    @GetMapping("/makes")
    public Flux<Object> getMakes() { return service.getMakes(); }

    @GetMapping("/maxprice")
    public Mono<Integer> getMaxPrice() { return repository.getMaxPrice(); }

    @GetMapping("/maxmileage")
    public Mono<Integer> getMaxMileage() { return repository.getMaxMileage(); }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Mono<Inventory> save(@RequestBody final Inventory data) { return service.save(data); }

    @PostMapping("/{id}")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Mono<Inventory> update(@PathVariable("id") final String id, @RequestBody final Inventory data) { return service.update(id, data); }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public Mono delete(@PathVariable final String id) { return service.delete(id); }


}
