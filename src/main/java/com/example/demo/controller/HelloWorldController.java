package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dao.UserDao;
import com.example.demo.model.DAOUser;

@CrossOrigin
@RestController
public class HelloWorldController {

	@Autowired
	private UserDao userDao;

	//@RequestMapping({ "/hello" })
	//public String firstPage() {
		//return "Hello World";
	//}
	
	// get by id
	@CrossOrigin(origins ="http://localhost:3000")
	@GetMapping("all/{mail}")
	public DAOUser getDOAUserById(@PathVariable(value = "mail") String mail) {
		return this.userDao.findByEmail(mail);
	}
	

}