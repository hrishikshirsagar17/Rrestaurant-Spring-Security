package com.spring.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.rest.model.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer>{

}
