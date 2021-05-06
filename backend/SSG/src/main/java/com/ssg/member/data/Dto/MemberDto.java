package com.ssg.member.data.Dto;

import lombok.*;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDto {
    private String loginId;
    private String loginPwd;
    private String phone;
    @Temporal(TemporalType.DATE)
    private Date birth;
}