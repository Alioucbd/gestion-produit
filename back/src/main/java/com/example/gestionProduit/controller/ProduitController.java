package com.example.gestionProduit.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.gestionProduit.dto.ProductDto;
import com.example.gestionProduit.service.ProductService;
@CrossOrigin(origins = "http://localhost:4200") // autorise ton Angular
@RestController
@RequestMapping("/products")
public class ProduitController {
	private final ProductService service;
	
	public ProduitController(ProductService service) {
		this.service = service;
	}
	
	@GetMapping
	public ResponseEntity<List<ProductDto>> getAllProducts() {
		return ResponseEntity.ok(service.allProducts());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ProductDto> getProduct(@PathVariable Long id) {
		return ResponseEntity.ok(service.getProduct(id));
	}
	
	@PostMapping
	public ResponseEntity<ProductDto> addProduct(@RequestBody ProductDto dto) {
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(service.addProduct(dto));
	}
	
	//delete
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
		service.deletePruduct(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping
	public ResponseEntity<ProductDto> updateProduct(@RequestBody ProductDto dto){
		return ResponseEntity.ok(service.updateProduct(dto));
	}
	
}
