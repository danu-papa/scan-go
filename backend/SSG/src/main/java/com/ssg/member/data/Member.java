package com.ssg.member.data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssg.shopping.payment.data.CurrentPayment;
import com.ssg.shopping.payment.data.CustomerPayment;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
@Entity
@Table(name = "member")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String loginId;
    private String loginPwd;
    private String phone;
    @Temporal(TemporalType.DATE)
    private Date birth;
    private long grade;

    @JsonIgnore
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<CustomerPayment> customerPayment = new ArrayList<CustomerPayment>();

    @JsonIgnore
    @OneToOne(mappedBy = "member", fetch = FetchType.LAZY)
    private CurrentPayment currentPayment;
}
