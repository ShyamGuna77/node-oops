
//interface

interface WeaponStrategy {
     useWeapon () :void
}


class sword implements WeaponStrategy {
    useWeapon(): void {
      console.log("Sword Slash")
    }
}

class Gub implements WeaponStrategy {
  useWeapon(): void {
    console.log("Shooting with Gun");
  }
}

class MagicWand implements WeaponStrategy {
  useWeapon(): void {
    console.log("KA-POW! You cast a fireball!");
  }
}


class Gamecharacter {
  private newWeapon: WeaponStrategy;

  constructor(startingWeapon: WeaponStrategy) {
    this.newWeapon = startingWeapon;
  }

  public setWeapon(newWeapon: WeaponStrategy) {
    this.newWeapon = newWeapon;
    }
    
    public attack() {
        this.newWeapon.useWeapon()
    }
}

const hero = new Gamecharacter (new sword());
hero.attack();

console.log("Changing weapon to Gun");

hero.setWeapon(new Gub());
hero.attack();

console.log("Changing weapon to Magic Wand");

hero.setWeapon (new MagicWand());
hero.attack();