package com.spring.rest.service;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.rest.model.Restaurant;
import com.spring.rest.repository.RestaurantRepository;

@Service
public class RestaurantService {	

	@Autowired
	private RestaurantRepository repository;
	
	LocalTime time=LocalTime.now();
	String lastUpdatedTime=time.toString();
	
	public List<Restaurant> getAllRestaurants()
	{
		List<Restaurant> list = (List<Restaurant>)repository.findAll();
		return list;
	}
	
	public Optional<Restaurant> getRestaurantById(int id)
	{
		Optional<Restaurant> restaurant = repository.findById(id);
		return restaurant;
	}
	
	public Restaurant addRestaurant(Restaurant restaurant)
	{
		restaurant.setLastModifiedTime(lastUpdatedTime);
		Restaurant result = repository.save(restaurant);
		System.out.println(lastUpdatedTime);
		return result;
	}
	
	
	public void updateRestaurantById(Restaurant restaurant, int id)
	{
		restaurant.setLastModifiedTime(lastUpdatedTime);
		restaurant.setId(id);
		repository.save(restaurant);
	}
	
	
	public void deleteRestaurantById(int id)
	{
		repository.deleteById(id);
	}
	

}
