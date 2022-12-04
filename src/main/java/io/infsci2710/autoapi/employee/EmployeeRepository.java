package io.infsci2710.autoapi.employee;


import io.infsci2710.autoapi.inventory.Inventory;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface EmployeeRepository extends R2dbcRepository<Employee, String> {

}
