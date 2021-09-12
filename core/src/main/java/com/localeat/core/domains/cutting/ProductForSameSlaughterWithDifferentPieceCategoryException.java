package com.localeat.core.domains.cutting;

import com.localeat.core.domains.slaughter.Slaughter;

public class ProductForSameSlaughterWithDifferentPieceCategoryException extends Exception {
    private Slaughter slaughter;

    public ProductForSameSlaughterWithDifferentPieceCategoryException(Slaughter slaughter) {
        super();
        this.slaughter = slaughter;
    }
}
