class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    if (this.creator === null) {
      return 0
    } else {
      return 1 + this.creator.numberOfVampiresFromOriginal;
    }
  }

  get lineage() {
    if (this.creator === null) {
      return this;
    } else {
      return [this.creator].concat(this.creator.lineage);
    }
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal) {
      return true;
    }
    return false;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    function searchHistories(seniorVamp, juniorVamp) {
      for (let i in seniorVamp.lineage) {
        if (juniorVamp.lineage.includes(seniorVamp.lineage[i])) {
           return seniorVamp.lineage[i];
        }
      }
    }
    if (this.creator === null || vampire.creator === this || vampire === this) {
      return this;
    } else if (this.lineage.includes(vampire)) {
      return vampire;
    } else {
      if (this.isMoreSeniorThan(vampire)) {
        return searchHistories(this, vampire);
      } else {
        return searchHistories(vampire, this);
      }
    }
  }
}

module.exports = Vampire;

