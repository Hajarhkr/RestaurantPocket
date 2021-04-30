package com.example.demo.model;

import java.io.Serializable;

public class JwtRequest implements Serializable {

	private static final long serialVersionUID = 5926468583005150707L;
	
	private String email;
	private String passwordrestaut;
	
	//need default constructor for JSON Parsing
	public JwtRequest()
	{
		
	}

	public JwtRequest(String email, String passwordrestaut) {
		this.setEmail(email);
		this.setPasswordrestaut(passwordrestaut);
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPasswordrestaut() {
		return passwordrestaut;
	}

	public void setPasswordrestaut(String passwordrestaut) {
		this.passwordrestaut = passwordrestaut;
	}

	
}