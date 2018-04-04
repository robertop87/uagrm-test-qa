package com.alenasoft.urbanager.resources.hello;

import com.alenasoft.urbanager.api.Result;
import io.dropwizard.hibernate.AbstractDAO;
import org.hibernate.SessionFactory;

public class ResultDao extends AbstractDAO<Result> {

    public ResultDao(SessionFactory sessionFactory) {
        super(sessionFactory);
    }

    public long create(Result result) {
        return this.persist(result).id;
    }

    public Result getById(long id) {
        return this.get(id);
    }
}
