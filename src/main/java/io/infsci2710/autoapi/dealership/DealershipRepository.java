package io.infsci2710.autoapi.dealership;


import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DealershipRepository extends R2dbcRepository<Dealership, String> {
}
