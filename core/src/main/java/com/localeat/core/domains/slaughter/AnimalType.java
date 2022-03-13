package com.localeat.core.domains.slaughter;

import java.util.Locale;
import java.util.Map;

public enum AnimalType {
    BEEF_COW(Map.of(Locale.FRENCH, "vache")),
    BEEF_HEIFER(Map.of(Locale.FRENCH, "génisse")),
    BEEF_BULL(Map.of(Locale.FRENCH, "taureau")),
    BEEF_VEAL(Map.of(Locale.FRENCH, "veau"));

    Map<Locale, String> labels;

    AnimalType(Map<Locale, String> labels) {
        this.labels = labels;
    }

    public String getLabel(Locale locale) {
        return labels.get(locale);
    }
}
