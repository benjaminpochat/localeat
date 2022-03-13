package com.localeat.core.domains.slaughter;

import java.util.Locale;
import java.util.Map;

public enum AnimalBreed {
    BEEF_LIMOUSIN(Map.of(Locale.FRENCH, "limousine")),
    BEEF_CHAROLAIS(Map.of(Locale.FRENCH, "charolaise"));

    Map<Locale, String> labels;

    AnimalBreed(Map<Locale, String> labels) {
        this.labels = labels;
    }

    public String getLabel(Locale locale) {
        return labels.get(locale);
    }
}
