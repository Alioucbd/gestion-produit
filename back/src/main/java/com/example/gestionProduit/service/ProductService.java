package com.example.gestionProduit.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.example.gestionProduit.dto.ProductDto;
import com.example.gestionProduit.entity.Product;
import com.example.gestionProduit.exception.InvalidInputException;
import com.example.gestionProduit.exception.ResourceNotFoundException;
import com.example.gestionProduit.mapper.EntityToDtoMapper;
import com.example.gestionProduit.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ProductService {
	private final ProductRepository repo;
    private static final Logger log = LoggerFactory.getLogger(ProductService.class);

	public ProductService(ProductRepository repo) {
		this.repo = repo;
	}
	
	public ProductDto getProduct(Long id) {
		if(id == null) {
			log.error("POST product/id , id is null");
			throw new InvalidInputException("id must not null");
		}
		Product product = repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("product with id " + id + " not found"));
		return EntityToDtoMapper.toDto(product);
	}
	
	public List<ProductDto> allProducts() {
		return repo.findAll().stream().map(EntityToDtoMapper::toDto).toList();
	}
	
	public ProductDto addProduct(ProductDto dto) {
		log.info("product received, name = " + dto.getName());
		
		Product product = EntityToDtoMapper.toEntity(dto);
		Product savedProduct = repo.save(product);
		log.info("product saved");
		
		return EntityToDtoMapper.toDto(savedProduct);
	}
	
	//delete
	public Long deletePruduct(Long id) {
		if(id == null) {
			log.error("DELETE products/id, id is null");
			throw new InvalidInputException("id must not null");
		}
		if(!repo.existsById(id)) {
			log.error("DELETE product/id product not found");
			throw new ResourceNotFoundException("Product not found");
		}
		repo.deleteById(id);
		log.info("product deleted");
		return id;
	}
	
	public ProductDto updateProduct(ProductDto dto) {
		if(dto ==null) {
			log.error("PUT product, product is null");
			throw new InvalidInputException("product must not null");
		}
		if(dto.getId() == null) {
			log.error("id is null");
			throw new InvalidInputException("Id must not null");
		}
		return repo.findById(dto.getId()).map(existingProduct->{
			existingProduct.setName(dto.getName());
			existingProduct.setDescription(dto.getDescription());
			
			return EntityToDtoMapper.toDto(repo.save(existingProduct));
		}).orElseThrow(()-> new ResourceNotFoundException("Product not found"));
	}
}
