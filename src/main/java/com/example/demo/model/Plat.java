package com.example.demo.model;

import javax.persistence.*;

@Entity
@Table(name="Plats")
public class Plat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name="nom_plat")
    private String nomplat;

    @Column(name="description")
    private String description;

    @Column(name="categorie")
    private String categorie;

    @Column(name="prix")
    private int prix;

    @Column(name="coverPhotoURL")
    private String coverPhotoURL;

    public Plat(String nomplat, String description, String categorie, int prix) {
        this.nomplat = nomplat;
        this.description = description;
        this.categorie = categorie;
        this.prix = prix;
        this.coverPhotoURL=coverPhotoURL;
    }

    public Plat(){

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNomplat() {
        return nomplat;
    }

    public void setNomplat(String nomplat) {
        this.nomplat = nomplat;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public int getPrix() {
        return prix;
    }

    public void setPrix(int prix) {
        this.prix = prix;
    }

    public String getCoverPhotoURL() {
        return coverPhotoURL;
    }

    public void setCoverPhotoURL(String coverPhotoURL) {
        this.coverPhotoURL = coverPhotoURL;
    }
}
