var { Shop, Item } = require("../src/gilded_rose.js");
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });

  it("the quality of conjured items should decrease twice as fast", function () {
    listItems.push(new Item("Conjured +5 Dexterity Vest", 2, 48));
    listItems.push(new Item("Conjured Mana Cake", 2, 50));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [{ quality: 46 }, { quality: 48 }];

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

  it("Quality should increase by 2 when between 10 and 5 days Aged Brie and Backstage passes)", function () {
    listItems.push(new Item("Aged Brie", 8, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [{ sellIn: 7, quality: 32 }];

    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
    });
  });

  it("Concert quality should be 0 after show )", function () {
    listItems.push(
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 30)
    );

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [{ sellIn: -2, quality: 0 }];

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

  it("Baisser de 2 la qualité et sellIn d'item perimé", function () {
    listItems.push(new Item("+5 Dexterity Vest", -1, 20));
    listItems.push(new Item("Mana Cake", -1, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -2, quality: 18 },
      { sellIn: -2, quality: 4 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("should not degrade Item quality below zero", function () {
    listItems.push(new Item("+5 Dexterity Vest", -1, 0));
    listItems.push(new Item("Mana Cake", -1, 0));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [
      { sellIn: -2, quality: 0 },
      { sellIn: -2, quality: 0 },
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

  it("La qualité d'un produit n'est jamais de plus de 50.", function () {
    listItems.push(new Item("Aged Brie", 5, 49));
    listItems.push(
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)
    );

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQuality();

    var expected = [{ quality: 50 }, { quality: 50 }];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
    });
  });
});
