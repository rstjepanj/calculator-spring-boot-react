package com.github.rstjepanj.calculator.controller;

import java.math.BigDecimal;
import java.math.RoundingMode;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class MainController {

	@GetMapping("/addition")
	public BigDecimal addition(@RequestParam("operand1") BigDecimal operand1, @RequestParam("operand2") BigDecimal operand2) {
		return operand1.add(operand2);
	}
	
	@GetMapping("/subtraction")
	public BigDecimal subtraction(@RequestParam("operand1") BigDecimal operand1, @RequestParam("operand2") BigDecimal operand2) {
		return operand1.subtract(operand2);
	}
	
	@GetMapping("/multiplication")
	public BigDecimal multiplication(@RequestParam("operand1") BigDecimal operand1, @RequestParam("operand2") BigDecimal operand2) {
		return operand1.multiply(operand2);
	}
	
	@GetMapping("/division")
	public BigDecimal division(@RequestParam("operand1") BigDecimal operand1, @RequestParam("operand2") BigDecimal operand2) {
		return operand1.divide(operand2, 5, RoundingMode.HALF_UP);
	}
	
}
