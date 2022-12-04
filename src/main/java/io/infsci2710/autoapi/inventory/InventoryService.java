package io.infsci2710.autoapi.inventory;

import io.infsci2710.autoapi.sales.Sales;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
@AllArgsConstructor
public class InventoryService {

    @Autowired
    InventoryRepository repository;

    public Mono<Page<Inventory>> findAllBy(Pageable pageable, int minPrice, int maxPrice, int minMileage, int maxMileage, String transmissionToggle, String driveToggle, String fuelToggle, String dealershipToggle) {
        List<String> transmissionToggleArr = Arrays.asList(transmissionToggle.split(","));
        List<String> driveToggleArr = Arrays.asList(driveToggle.split(","));
        List<String> fuelToggleArr = Arrays.asList(fuelToggle.split(","));
        List<String> dealershipToggleArr = Arrays.asList(dealershipToggle.split(","));
        return repository.findAllByPriceBetweenAndMileageBetweenAndTransmissionInAndDriveInAndFuelInAndDealershipIdIn(minPrice, maxPrice, minMileage, maxMileage, transmissionToggleArr, driveToggleArr, fuelToggleArr, dealershipToggleArr, pageable)
                .collectList()
                .zipWith(this.repository.findAllByPriceBetweenAndMileageBetweenAndTransmissionInAndDriveInAndFuelInAndDealershipIdIn(minPrice, maxPrice, minMileage, maxMileage, transmissionToggleArr, driveToggleArr, fuelToggleArr, dealershipToggleArr,null).count())
                .map(t -> new PageImpl<>(t.getT1(), pageable, t.getT2()));
    }

    public Mono<Page<Inventory>> findAllByMake(Pageable pageable, int minPrice, int maxPrice, int minMileage, int maxMileage, String transmissionToggle, String driveToggle, String fuelToggle, String dealershipToggle, String make) {
        List<String> transmissionToggleArr = Arrays.asList(transmissionToggle.split(","));
        List<String> driveToggleArr = Arrays.asList(driveToggle.split(","));
        List<String> fuelToggleArr = Arrays.asList(fuelToggle.split(","));
        List<String> dealershipToggleArr = Arrays.asList(dealershipToggle.split(","));
        return repository.findAllByPriceBetweenAndMileageBetweenAndTransmissionInAndDriveInAndFuelInAndDealershipIdInAndMakeEquals(minPrice, maxPrice, minMileage, maxMileage, transmissionToggleArr, driveToggleArr, fuelToggleArr, dealershipToggleArr,make, pageable)
                .collectList()
                .zipWith(this.repository.findAllByPriceBetweenAndMileageBetweenAndTransmissionInAndDriveInAndFuelInAndDealershipIdInAndMakeEquals(minPrice, maxPrice, minMileage, maxMileage, transmissionToggleArr, driveToggleArr, fuelToggleArr, dealershipToggleArr,make, null).count())
                .map(t -> new PageImpl<>(t.getT1(), pageable, t.getT2()));
    }

    public Flux<Object> getMakes() { return repository.getDistinctMakes().map(data -> data.getMake()); }

    public Mono<Inventory> save(Inventory tuple) { return repository.insertInventory(tuple.getVin(), tuple.getMake(), tuple.getModel(), tuple.getModel_year(), tuple.getEngine(), tuple.getMileage(), tuple.getPrice(), tuple.getColor(), tuple.getTransmission(), tuple.getDrive(), tuple.getFuel(), tuple.getDealershipId()); }

    public Mono<Inventory> update(String id,Inventory tuple) { return repository.save(tuple); }

    public Mono<Inventory> delete(final String id) {
        final Mono<Inventory> dbObj = getById(id);
        if (Objects.isNull(dbObj)) {
            return Mono.empty();
        }
        return getById(id).switchIfEmpty(Mono.empty()).filter(Objects::nonNull).flatMap(tupleToDelete ->
                repository.delete(tupleToDelete).then(Mono.just(tupleToDelete)));
    }

    public Mono<Inventory> getById(final String id) { return repository.findById(id).switchIfEmpty(Mono.empty()); }


}
