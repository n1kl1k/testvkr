package com.fzo.fzo.rusoil.model;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name ="activity")
@Data
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "additionalInfo_id")
    private AdditionalInfo additionalInfo;

    @Column(length = 500)
    private String activity;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Activity)) return false;
        Activity activity = (Activity) o;
        return id != null && id.equals(activity.getId());
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
