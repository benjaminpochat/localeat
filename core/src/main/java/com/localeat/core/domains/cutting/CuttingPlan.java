package com.localeat.core.domains.cutting;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class CuttingPlan {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @OneToMany
    private List<CuttingPlanElement> elements = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<CuttingPlanElement> getElements() {
        return elements;
    }

    public float getWeight(PieceCategory pieceCategory, Shaping shaping) {
        return elements.stream()
                .filter(element -> element.getPieceCategory().equals(pieceCategory) && element.getShaping().equals(shaping))
                .map(CuttingPlanElement::getWeight)
                .reduce(0f, Float::sum);
    }

    public void setWeight(PieceCategory pieceCategory, Shaping shaping, float weight) {
        CuttingPlanElement element = elements.stream()
                .filter(e -> e.getPieceCategory().equals(pieceCategory) && e.getShaping().equals(shaping))
                .findFirst().orElseGet(() -> {
                    var cuttingPlanElement = new CuttingPlanElement();
                    cuttingPlanElement.setPieceCategory(pieceCategory);
                    cuttingPlanElement.setShaping(shaping);
                    cuttingPlanElement.setWeight(0f);
                    this.elements.add(cuttingPlanElement);
                    return cuttingPlanElement;
                });
        element.setWeight(element.getWeight() + weight);
    }

    @Entity
    public class CuttingPlanElement {

        @Id
        @Column(name = "id", nullable = false)
        private Long id;

        private PieceCategory pieceCategory;

        private Shaping shaping;
        private float weight;
        public PieceCategory getPieceCategory() {
            return pieceCategory;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public void setPieceCategory(PieceCategory pieceCategory) {
            this.pieceCategory = pieceCategory;
        }

        public Shaping getShaping() {
            return shaping;
        }

        public void setShaping(Shaping shaping) {
            this.shaping = shaping;
        }

        public float getWeight() {
            return weight;
        }

        public void setWeight(float weight) {
            this.weight = weight;
        }
    }
}
