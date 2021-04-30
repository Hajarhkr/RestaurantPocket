package com.example.demo.controller;


import com.example.demo.model.Plat;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.dao.PlatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plats")
@CrossOrigin(origins="*")
public class PlatController {

    @Autowired
    private PlatRepository platRepository;

    //get All plats

    @GetMapping
    public List<Plat> getAllPlats(){
        return this.platRepository.findAll();
    }
    //get plat by id
        @GetMapping("/{id}")
    public  Plat getPlatById(@PathVariable(value="id") long platId){
        return this.platRepository.findById(platId).orElseThrow(()->new ResourceNotFoundException("Plat non trouvé avec id:" + platId));
    }



    //create play
    @PostMapping
    public Plat createPlat(@RequestBody Plat plat){
        return this.platRepository.save(plat);
    }
    //update plat

    @PutMapping("/{id}")
    public Plat updatePlat(@RequestBody Plat plat, @PathVariable("id") long platId){
       Plat existingPlat=  this.platRepository.findById(platId)
               .orElseThrow(()->new ResourceNotFoundException("Plat non trouvé avec id:" + platId));
        existingPlat.setNomplat(plat.getNomplat());
        existingPlat.setDescription(plat.getDescription());
        existingPlat.setCategorie(plat.getCategorie());
        existingPlat.setPrix(plat.getPrix());
        existingPlat.setCoverPhotoURL(plat.getCoverPhotoURL());
        return this.platRepository.save(existingPlat);


    }
    //delete plat by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Plat> deletePlat(@PathVariable("id") long platId){
        Plat existingPlat=  this.platRepository.findById(platId)
                .orElseThrow(()->new ResourceNotFoundException("Plat non trouvé avec id:" + platId));
        this.platRepository.delete(existingPlat);
        return ResponseEntity.ok().build();

    }

}
