package io.infsci2710.autoapi.loan;


import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.r2dbc.repository.R2dbcRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface LoanRepository extends R2dbcRepository<Loan, String> {

    @Query("insert into loan (id, principal, apr, duration, lender_id, sale_id, customer_id)" +
            "values (:id, :principal, :apr, :duration, :lender_id, :sale_id, :customer_id);")
    Mono<Loan> saveLoan(String id, int principal, double apr, int duration, int lender_id, int sale_id, int customer_id);

}
