var { Shop, Item } = require("../src/gilded_rose.js");
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });

  it("Aged Brie augmente sa qualité (quality) plus le temps passe.", function () {
    listItems.push(new Item("Aged Brie", 1, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [{ sellIn: 0, quality: 33 }];

    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
    });
  });

  it("Test if the quality of Sulfuras does not change", function () {
    listItems.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [{ quality: 80 }];

    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
    });
  });

  it("Test if the quality increases by 3 when there are 5 days or less (Aged Brie and Backstage passes)", function () {
    listItems.push(new Item("Aged Brie", 5, 30));
    listItems.push(
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 30)
    );

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [{ quality: 33 }, { quality: 33 }];

    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
    });
  });

  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new Item("Aged Brie", 20, 30));
    listItems.push(
      new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30)
    );

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  // La qualité (quality) d'un produit ne peut jamais être négative
  //La qualité d'un produit n'est jamais de plus de 50.
  // Une fois que la date de péremption est passée, la qualité se dégrade deux fois plus rapidement.
  // "Backstage passes", comme le "Aged Brie", augmente sa qualité (quality) plus le temps passe (sellIn) ; La qualité augmente de 2 quand il reste 10 jours ou moins et de 3 quand il reste 5 jours ou moins, mais la qualité tombe à 0 après le concert.
});
