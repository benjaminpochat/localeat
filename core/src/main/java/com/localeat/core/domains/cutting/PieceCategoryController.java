package com.localeat.core.domains.cutting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Set;

@RestController
public class PieceCategoryController {

    @Autowired
    private CuttingService cuttingService;

    @GetMapping(path = "/piececategories/percentages")
    public Map<PieceCategory, Float> getPieceCategoryPercentage () {
        return cuttingService.getPieceCategoryPercentage();
    }

    @GetMapping(path = "/piececategories/shapings")
    public Map<PieceCategory, Set<Shaping>> getPieceCategoryShapings () {
        return cuttingService.getPieceCategoryShapings();
    }
}
