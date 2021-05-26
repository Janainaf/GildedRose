class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const AGED_BRIE = "Aged Brie";
const CONCERT_PASS = "Backstage passes to a TAFKAL80ETC concert";
const SULFURAS = "Sulfuras, Hand of Ragnaros";

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.IsSulfuras(i)) {
        continue;
      }

      this.updateItemQuality(i);
    }
    return this.items;
  }

  updateItemQuality(i) {
    if (!this.IsAgedBrieOrConcertPass(i)) {
      this.DecreaseQualityBy1(i);
    } else {
      this.IncreaseSpecialItemsQuality(i);
    }

    if (this.items[i].sellIn < 0) {
      if (!this.IsAgedBrie(i)) {
        this.DecreaseQuality(i);
      } else {
        this.IncreaseBrieQuality(i);
      }
    }

    if (!this.IsSulfuras(i)) {
      this.items[i].sellIn -= 1;
      this.preventQualityHigherThan50(i);
    }
  }

  preventQualityHigherThan50(i) {
    if (this.items[i].quality >= 50) {
      this.items[i].quality = 50;
    }
  }

  DecreaseQuality(i) {
    if (!this.IsConcertPass(i)) {
      this.DecreaseQualityBy1(i);
    } else {
      this.items[i].quality = 0;
    }
  }

  IsAgedBrie(i) {
    return this.items[i].name == AGED_BRIE;
  }

  IncreaseBrieQuality(i) {
    if (this.IsLessThan50(i)) {
      this.items[i].quality += 1;
    }
  }

  IncreaseSpecialItemsQuality(i) {
    if (this.items[i].sellIn <= 5) {
      this.items[i].quality += 3;
    } else if (this.items[i].sellIn < 10 && this.items[i].sellIn > 5) {
      this.items[i].quality += 2;
    } else {
      if (this.IsLessThan50(i)) {
        this.items[i].quality += 1;
        this.TryIncreaseConcertPassQuality(i);
      }
    }
  }

  TryIncreaseConcertPassQuality(i) {
    if (this.IsConcertPass(i)) {
      this.IncreaseConcertPassQuality(i);
    }
  }

  IncreaseConcertPassQuality(i) {
    if (this.items[i].sellIn < 11) {
      this.items[i].quality += 1;
    }
    if (this.items[i].sellIn < 6) {
      this.items[i].quality += 1;
    }
  }

  DecreaseQualityBy1(i) {
    if (this.items[i].quality > 0) {
      this.items[i].quality -= 1;
    }
  }

  IsConcertPass(i) {
    return this.items[i].name == CONCERT_PASS;
  }

  IsSulfuras(i) {
    return this.items[i].name == SULFURAS;
  }

  IsAgedBrieOrConcertPass(i) {
    return (
      this.items[i].name == AGED_BRIE || this.items[i].name == CONCERT_PASS
    );
  }

  IsLessThan50(i) {
    return this.items[i].quality < 50;
  }
}

module.exports = {
  Item,
  Shop,
};
