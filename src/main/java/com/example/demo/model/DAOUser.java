package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;



@Entity
@Table(name = "restau",uniqueConstraints = { 
		@UniqueConstraint(columnNames = "nomrestaut"),
		@UniqueConstraint(columnNames = "email") })

public class DAOUser {
	
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long qr;
	
	@Column
	@NotBlank
	@Size(max = 20)
	private String nomrestaut;
	
	@Column
	@NotBlank
	@Size(max = 20)
	@Email
	private String email;

	@Column
	@NotBlank
	@Size(max = 20)
	private String code;
	
	@Column
	@JsonIgnore
	private String passwordrestaut;

	
	
	public DAOUser() {
		
	}
	
	

	public DAOUser(String nomrestaut, String email, String code, String passwordrestaut) {
		super();
		this.nomrestaut = nomrestaut;
		this.email = email;
		this.code = code;
		this.passwordrestaut = passwordrestaut;
	}



	public long getQr() {
		return qr;
	}

	public void setQr(long qr) {
		this.qr = qr;
	}

	public String getNomrestaut() {
		return nomrestaut;
	}

	public void setNomrestaut(String nomrestaut) {
		this.nomrestaut = nomrestaut;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getPasswordrestaut() {
		return passwordrestaut;
	}

	public void setPasswordrestaut(String passwordrestaut) {
		this.passwordrestaut = passwordrestaut;
	}

	
}