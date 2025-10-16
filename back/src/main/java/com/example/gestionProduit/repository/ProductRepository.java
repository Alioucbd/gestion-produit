package com.example.gestionProduit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.gestionProduit.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	Product findByName(String name);
}
