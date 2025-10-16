package com.example.gestionProduit.mapper;

import com.example.gestionProduit.dto.ProductDto;
import com.example.gestionProduit.entity.Product;

public class EntityToDtoMapper {
	
	public static Product toEntity(ProductDto dto) {
		Product product = new Product();
		product.setId(dto.getId());
		product.setName(dto.getName());
		product.setDescription(dto.getDescription());
		return product;
	}
	
	public static ProductDto toDto(Product product) {
		return new ProductDto(product.getId(), product.getName(), product.getDescription());
	}
}
