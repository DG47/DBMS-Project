package io.infsci2710.autoapi.inventory;


import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveSortingRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Repository
public interface InventoryRepository extends ReactiveSortingRepository<Inventory, String> {


    Flux<Inventory> findAllByPriceBetweenAndMileageBetweenAndTransmissionInAndDriveInAndFuelInAndDealershipIdIn(
            int minPrice,
            int maxPrice,
            int minMileage,
            int maxMileage,
            List<String> transmissionToggle,
            List<String> driveToggle,
            List<String> fuelToggle,
            List<String> dealershipToggle,
            Pageable pageable
    );

    Flux<Inventory> findAllByPriceBetweenAndMileageBetweenAndTransmissionInAndDriveInAndFuelInAndDealershipIdInAndMakeEquals(
            int minPrice,
            int maxPrice,
            int minMileage,
            int maxMileage,
            List<String> transmissionToggle,
            List<String> driveToggle,
            List<String> fuelToggle,
            List<String> dealershipToggle,
            String make,
            Pageable pageable
    );

    @Query("select distinct vi.make from vehicle_inventory vi order by vi.make;")
    Flux<Inventory> getDistinctMakes();

    @Query("select max(vi.price) from vehicle_inventory vi")
    Mono<Integer> getMaxPrice();

    @Query("select max(vi.mileage) from vehicle_inventory vi")
    Mono<Integer> getMaxMileage();

    @Query("insert into vehicle_inventory (vin, make, model, model_year, engine, mileage, price, color, transmission, drive, fuel, dealership_id) " +
            "values (:vin, :make, :model, :model_year, :engine, :mileage, :price, :color, :transmission, :drive, :fuel, :dealership_id);")
    Mono<Inventory> insertInventory(String vin, String make, String model, Integer model_year, String engine, Integer mileage, Integer price,
                                    String color, String transmission, String drive, String fuel, Integer dealership_id);

}

