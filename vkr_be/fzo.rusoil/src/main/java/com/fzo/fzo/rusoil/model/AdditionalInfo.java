package com.fzo.fzo.rusoil.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "additional_info")
public class AdditionalInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "cards_id")
    private Cards cards;

    @Column(length = 100)
    private String title;

    @Column(length = 1000)
    private String info;

    @OneToMany(mappedBy = "additionalInfo", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Activity> activityList = new HashSet<>();

    @OneToMany(mappedBy = "additionalInfo", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Partners> partnersList = new HashSet<>();

    @OneToMany(mappedBy = "additionalInfo", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Plan> planList = new HashSet<>();

    @OneToMany(mappedBy = "additionalInfo", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Requirments> requirmentsList = new HashSet<>();

    // --- helpers ---
    public void addActivity(Activity a) {
        activityList.add(a);
        a.setAdditionalInfo(this);
    }

    public void addPartners(Partners p) {
        partnersList.add(p);
        p.setAdditionalInfo(this);
    }

    public void addPlan(Plan p) {
        planList.add(p);
        p.setAdditionalInfo(this);
    }

    public void addRequirments(Requirments r) {
        requirmentsList.add(r);
        r.setAdditionalInfo(this);
    }
}