package com.earth.cbr.models;

import com.earth.cbr.context.SpringContext;
import com.earth.cbr.services.WorkerService;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity(name = "WorkerCreateAccountCode")
@Table(name = "worker_create_account_code")
public class WorkerCreateAccountCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            name = "code",
            columnDefinition = "TEXT"
    )
    @NotNull
    @NotBlank
    private String code;

    @Column(
            name = "created_date",
            columnDefinition = "DATE"
    )
    @CreatedDate
    private Date createdDate;

    @Column (
            name = "is_used",
            columnDefinition = "BOOLEAN"
    )
    @NotNull(message = "Worker create account code is used column cannot be null")
    private Boolean isUsed;

    @Column(
            name = "used_by_worker_id",
            columnDefinition = "BIGINT"
    )
    private Long usedByWorkerId;

    public WorkerCreateAccountCode() {
    }

    public WorkerCreateAccountCode(Long id, String code, Date createdDate, Boolean isUsed) {
        this.id = id;
        this.code = code;
        this.createdDate = createdDate;
        this.isUsed = isUsed;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Boolean getUsed() {
        return isUsed;
    }

    public void setUsed(Boolean used) {
        isUsed = used;
    }

    public Long getUsedByWorkerId() {
        return usedByWorkerId;
    }

    public void setUsedByWorkerId(Long usedByWorkerId) {
        this.usedByWorkerId = usedByWorkerId;
    }
}
